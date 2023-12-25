import DocumentPicker from 'react-native-document-picker';

const fileTypes = {
  image: [DocumentPicker.types.images],
  pdf: [DocumentPicker.types.pdf],
  doc: [DocumentPicker.types.doc],
  docx: [DocumentPicker.types.docx],
  ppt: [DocumentPicker.types.ppt],
  pptx: [DocumentPicker.types.pptx],
  xls: [DocumentPicker.types.xls],
  xlsx: [DocumentPicker.types.xlsx],
  audio: [DocumentPicker.types.audio],
  video: [DocumentPicker.types.video],
  plainText: [DocumentPicker.types.plainText],
  zip: [DocumentPicker.types.zip],
  csv: [DocumentPicker.types.csv],
};

export default fileTypes;