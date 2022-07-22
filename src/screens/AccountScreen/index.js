import React, {useState, useRef} from 'react'
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/AntDesign';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native'
import auth from '@react-native-firebase/auth';
import { images } from '../../../assets/images';
import ImagePicker from 'react-native-image-crop-picker';

const AccountScreen = ({navigation}) => {
    const user = auth().currentUser
    const [display, setDisplay] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const [name, setName] = useState(user.displayName === null ? user.email.split("@")[0] : user.displayName)
    const [image, setImage] = useState(user.photoURL);
    const updateName =() => {
        user.updateProfile({displayName: displayName})
        setName(displayName)
        setDisplay(!display)
        setDisplayName("")
    }
    const updateImage =() => {
        user.updateProfile({photoURL: image})
    }
    const modalizeRef = useRef(null);
    const onOpen = () => {
        modalizeRef.current.open();
    };
    
    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          setImage(image.path);
          updateImage()
          console.log(user);
        });
    }
    
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          setImage(image.path);
          updateImage()
          console.log(user);
        });
    }
    return (
    <View style={styles.container}>
        <View style={{margin: 20}}>
        <View style = {styles.title}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrowleft" size={30} color={ "black"}/>
            </TouchableOpacity>
            <Text style = {styles.text}>Account Settings</Text>
        </View>
        <ScrollView>
            <View style = {styles.content}>
                <Text style = {{fontSize: 11}}>Avatar</Text>
                <View style = {styles.container}></View>
                {image === null ?  <Image style = {styles.img} source={images.acc}/>
                :  <Image  source={{uri: image}} style={styles.img}></Image>}
                <TouchableOpacity onPress={onOpen}>
                    <Text style = {styles.icon}>{`>`}</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.content}>
                <Text style = {{fontSize: 11}}>Email address</Text>
                <View style = {styles.container}></View>
                <Text style = {{fontSize: 11}}>{user.email}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("EmailScreen")}>
                    <Text style = {styles.icon}>{`>`}</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.content}>
                <Text style = {{fontSize: 11}}>Display name</Text>
                <View style = {styles.container}></View>
                <Text style = {{fontSize: 11}}>{name}</Text>
                <TouchableOpacity onPress={() => setDisplay(!display)}>
                    <Text style = {styles.icon}>{`>`}</Text>
                </TouchableOpacity>
            </View>

            {!display ? null : 
            <View>
                <View style = {styles.pass}>
                <TextInput
                    style ={styles.input}
                    value={displayName}
                    onChangeText={text => setDisplayName(text)}
                    placeholder = "Enter your display name..."
                />
                <TouchableOpacity onPress={() => updateName()}>
                    <Text style = {styles.change}>Change</Text>
                </TouchableOpacity>
                        
                </View>
            </View>
            }
             
            <View style = {styles.content}>
                <Text style = {{fontSize: 11}}>Change password</Text>
                <View style = {styles.container}></View>
                <TouchableOpacity onPress={() => navigation.navigate("PassScreen")}>
                    <Text style = {styles.icon}>{`>`}</Text>
                </TouchableOpacity>
            </View>

        </ScrollView> 
        </View>
        <Modalize ref={modalizeRef} snapPoint={290}>
            <View >
                <View style = {styles.modal}>
                    <Text style = {styles.upload}>Upload Photo</Text>
                    <Text >Choose Your Profile Picture</Text>
                </View>
            
                <View style = {styles.choose}>
                    <TouchableOpacity onPress={takePhotoFromCamera}>
                        <Text>Take Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.choose}>
                    <TouchableOpacity onPress={choosePhotoFromLibrary}>
                        <Text>Choose From Library</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.choose}>
                    <TouchableOpacity onPress={()=>{modalizeRef.current.close() }}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </Modalize>      
    </View>
  )
}

export default AccountScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10
    },
    title: {
        flexDirection: "row", 
        alignItems: "center",
        marginBottom: 20
    },
    content: {
        flexDirection: "row", 
        alignItems: "center",
        marginBottom: 10
    },
    text: {
        marginLeft: 10, 
        fontWeight: "bold"
    },
    icon: {
        fontSize: 18, 
        marginLeft: 7,
    },
    change: {
        fontSize: 10,
        fontWeight: "bold", 
        marginRight: 5
    },
    pass: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: "gray", 
        borderWidth: 1, 
        marginBottom: 8,
        borderRadius: 7, 
        paddingHorizontal: 5,
    },
    input: {
        fontSize: 10, 
        padding: 8
    },
    upload: {
        fontSize: 20, 
        marginTop: 10,
        fontWeight: "bold"
    },
    choose: {
        backgroundColor: "lightgray", 
        margin: 5,
        borderRadius: 10, 
        padding: 9,
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        alignItems: "center", 
        marginVertical: 10
    }
});
