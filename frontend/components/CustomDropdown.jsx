import { styles } from "@/assets/styles/logOrder.styles.js";
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { COLORS } from "@/constants/color.js";

export const CustomDropdown = ({ placeholderText }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    return (
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.borderDrk }]}
            placeholderStyle={[
                styles.placeholderStyle,
                isFocus && { color: COLORS.borderDrk }
            ]}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? placeholderText : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
            }}
            renderLeftIcon={() => (
                <MaterialCommunityIcons
                style={styles.icon}
                color={isFocus ? COLORS.borderDrk : COLORS.border}
                name="form-dropdown"
                size={22}
                />
            )}
        />
    )   
}