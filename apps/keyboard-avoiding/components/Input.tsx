import { Colors } from "@/constants/theme"
import { TextInput } from "react-native"

const Input = () => {

    return (
        <TextInput
            style={{
                color: Colors.light.text,
                padding: 8,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: Colors.light.icon,
                marginHorizontal: 10,
                marginTop: 10
            }}
            placeholder="Write something..."
        ></TextInput>
    )
}


export default Input;