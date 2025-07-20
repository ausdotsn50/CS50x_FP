import { styles } from "@/assets/styles/logOrder.styles.js";
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { COLORS } from "@/constants/color.js";

export const CustomDropdown = ({ placeholderText, data }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.borderDrk }]}
            placeholderStyle={[
                styles.placeholderStyle,
                isFocus && { color: COLORS.borderDrk }
            ]}
            selectedTextStyle={[styles.selectedTextStyle, isFocus && {color : COLORS.borderDrk}]}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={styles.itemTextStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? placeholderText : '...'}
            searchPlaceholder="Search"
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
            }}
            renderRightIcon={() => {
                null
            }}
        />
    )   
}