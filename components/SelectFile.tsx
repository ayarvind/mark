import React, { Children } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import fileTypes from '../common/fileType';

type SelectFileProps = {
    fileType: any;
    onSelect: (file:DocumentPickerResponse[]) => void;
    onCancel: () => void;
    children?: React.ReactNode;
};

const SelectFile = ({ fileType, onSelect, onCancel ,children}: SelectFileProps): React.JSX.Element => {
    const selectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: fileType || [DocumentPicker.types.allFiles],
            });
           onSelect(res);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                onCancel();
            } else {
                throw err;
            }
        }
    };

    return (
        <Pressable  onPress={selectFile} style={{ flex: 1 }}>
            {children}
        </Pressable>
    );
};

export default SelectFile;

const styles = StyleSheet.create({});
