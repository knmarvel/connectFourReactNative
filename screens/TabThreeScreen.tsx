import * as React from 'react';
import { StyleSheet } from 'react-native';

import ConnectFourBoard from "../components/ConnectFourBoard"
import { Text, View } from "../components/Themed";

export default function TabThreeScreen(){
    return (
        <View>
        <Text>"I'm tab three! Does this work?"</Text>
        <ConnectFourBoard/>
        </View>
    )
}