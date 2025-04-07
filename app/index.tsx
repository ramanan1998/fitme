import { View, Text, Image, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from "expo-image-picker"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { generateImage } from '@/services/api'

const index = () => {

    const [ selfImage, setSelfImage ] = useState<string | null>(null);
    const [ modelImage, setModelImage ] = useState<string | null>(null);

    const uploadSelfFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
      
        if (!result.canceled) {
            setSelfImage(result.assets[0].uri);
        } 
    }

    const uploadModelFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
      
        if (!result.canceled) {
            setModelImage(result.assets[0].uri);
        } 
    }

    const { mutate, isPending } = useMutation({
        mutationKey: [ "generateImage" ],
        mutationFn: generateImage,
        onSuccess: (data) => {
            Alert.alert("Request Success", JSON.stringify(data))
        },
        onError: (error) => {
            Alert.alert("Request Error", JSON.stringify(error))
        }
    });

    const submitImages = async () => {
        try{

            if (!selfImage || !modelImage) {
                return Alert.alert("Image is Required", "Please upload both the images");
            }


            const formData = new FormData();

            const fetchBlob = async (uri: string) => {
                const res = await fetch(uri);
                return res.blob();
            }

            const selfImageBlob = await fetchBlob(selfImage);
            const modelImageBlob = await fetchBlob(modelImage);
    
            formData.append("selfImage", selfImageBlob, "selfImage.jpg");

            formData.append("modelImage", modelImageBlob, "modelImage.jpg");

            mutate({ formData });

        }catch(error){
            console.log(JSON.stringify(error))
        }
    }

    

  return (
    <SafeAreaView className="bg-background px-2 flex-1">
        {/* Container to hold both Upload Sections */}
        <View className="flex-1 flex-col gap-3 -mt-7">
            {/* First Upload Section */}
            <View className="flex-1">
                <TouchableOpacity
                    className="border-[2px] border-dashed border-purple-500 rounded-lg flex items-center justify-center flex-1"
                    onPress={uploadSelfFile}
                >
                    {selfImage ? (
                        <Image className="h-full w-full rounded-md" source={{ uri: selfImage }} />
                    ) : (

                        <View className='flex justify-center items-center gap-8'>
                            <MaterialCommunityIcons name="file-image-plus-outline" size={36} color="#9333ea" />
                            <Text className='text-purple-600 font-semibold'>Upload your picture</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Try On Button */}
            <Pressable disabled={!selfImage || !modelImage || isPending} onPress={submitImages} className="bg-purple-500 rounded-lg active:bg-purple-400/80 transition-all duration-150 disabled:bg-purple-300">
                <Text className="mx-auto text-white font-albert-sans py-3 font-semibold text-xl">Try On</Text>
            </Pressable>

            {/* Second Upload Section */}
            <View className="flex-1">
                <TouchableOpacity
                    className="border-[2px] border-dashed border-purple-500 rounded-lg flex items-center justify-center flex-1"
                    onPress={uploadModelFile}
                >
                    {modelImage ? (
                        <Image className="h-full w-full rounded-md" source={{ uri: modelImage }} />
                    ) : (
                        <View className='flex justify-center items-center gap-8'>
                            <MaterialCommunityIcons name="file-image-plus-outline" size={36} color="#9333ea" />
                            <Text className='text-purple-600 font-semibold'>Upload the picture of the outfit you wanna try</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>

    </SafeAreaView>
  )
}

export default index