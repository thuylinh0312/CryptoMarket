import React , {useState, useRef} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import { images } from '../../../../assets/images';
import { Modalize } from 'react-native-modalize';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {useSelector, useDispatch} from 'react-redux'
import { uploadImage } from '../../../actions/coinListAction';


const UploadImageScreen = ({navigation}) => {
    const dispatch = useDispatch() 
    const user = auth().currentUser
    const [display, setDisplay] = useState(user.photoURL);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const update =(image) => {
        setImage(image)
        setDisplay(image)
        dispatch(uploadImage(image))
    }
    const uploadImageFirebase = async () => {
        const uploadUri = image;
        const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        
        setUploading(true);
        setTransferred(0);
        const storageRef = storage().ref(filename)
        const task = storageRef.putFile(uploadUri)
        task.on('state_changed', snapshot => {
            setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000);
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            user.updateProfile({photoURL: url})  
        } catch (e) {
            console.error(e);
        }
        
        setUploading(false);
        alert("Cập nhật ảnh thành công!")
    };

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
            update(image.path)
        });
    }
  
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            update(image.path)
        });
    }
    return (
    <View style={styles.container}>
        <View style = {{margin: 20}}>
            <View style = {styles.title}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrowleft" size={30} color={ "black"}/>
                </TouchableOpacity>
                <Text style = {styles.texttt}>Change profile picture</Text>
            </View>
            <View>
                {display === null ?  <Image style = {styles.img} source={images.acc}/>
                :  image !== null ? <Image  source={{uri: image}} style={styles.img}/> 
                : <Image  source={{uri: display}} style={styles.img}/>}
                <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity style={styles.button} onPress={onOpen}>
                        <Text style={styles.buttonText}>Pick image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={uploadImageFirebase}>
                        <Text style={styles.buttonText}>Upload image</Text>
                    </TouchableOpacity>
                </View>  
            </View>
            {uploading ? (
            <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
            </View>
            ) : null}
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

export default UploadImageScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    progressBarContainer: {
        marginTop: 20,
        alignSelf: "center"
    },
    img: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginVertical: 35,
        alignSelf: "center"
    },
    title: {
        flexDirection: "row", 
        alignItems: "center",
    },
    texttt: {
        marginLeft: 10, 
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
    },
    upload: {
        fontSize: 20, 
        marginTop: 10,
        fontWeight: "bold"
    },
    button: {
        borderRadius: 5,
        width: 145,
        height: 45,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
