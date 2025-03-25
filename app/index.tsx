import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from "expo-image-picker"
import { Client } from "@gradio/client";

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
      
        console.log(result);
      
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
      
        console.log(result);
      
        if (!result.canceled) {
            setModelImage(result.assets[0].uri);
        } 
    }


    const generateImage = async () => {
        try{
            const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
            const exampleImage = await response_0.blob();
                                    
            const app = await Client.connect("yisol/IDM-VTON");
            const result = await app.predict("/tryon", [		
                {"background": exampleImage,"layers":[],"composite":null}, // undefined  in 'Human. Mask with pen or use auto-masking' Imageeditor component
                exampleImage, 	// blob in 'Garment' Image component		
                "Hello!!", // string  in 'parameter_17' Textbox component		
                true, // boolean  in 'Yes' Checkbox component		
                true, // boolean  in 'Yes' Checkbox component		
                3, // number  in 'Denoising Steps' Number component		
                3, // number  in 'Seed' Number component
            ]);
            console.log(result.data);
        }catch(error){
            console.log(error)
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
                        <Text>Select File</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Try On Button */}
            <Pressable onPress={generateImage} className="bg-purple-500 rounded-lg active:bg-purple-400/80 transition-all duration-150">
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
                        <Text>Select File</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>

    </SafeAreaView>
  )
}

export default index