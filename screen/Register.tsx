import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, BackHandler, Pressable, SafeAreaView, Image } from 'react-native';
import Colors from '../common/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { setStatusBar } from '../redux/actions';
import { useDispatch } from 'react-redux';
import FloatingActionButton from '../Widgets/FloatingActionButton';
import strings from '../common/strings';
import { name as appName } from '../app.json'
import * as  yup from 'yup';
import RNPickerSelect from 'react-native-dropdown-picker';
import RegisterSchema from '../common/RegisterSchema';
import genders from '../data/gender'
import DatePicker from 'react-native-date-picker';
import parseDate from '../common/parseDate';
import SelectFile from '../components/SelectFile';
import fileTypes from '../common/fileType';
import { DocumentPickerResponse } from 'react-native-document-picker';
import User from '../auths/User';
import { UserProps } from '../auths/Auth';


const Register = ({ navigation }: { navigation: any }): React.JSX.Element => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString());
  const [gender, setGender] = useState('');
  // const [mobileNumber, setMobileNumber] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<DocumentPickerResponse>({} as DocumentPickerResponse);
  const [otp, setOtp] = useState<string>('');
  const [openGender, setOpenGender] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputValid, setIsInputValid] = useState({
    fullName: {
      isValid: false,
      message: "Your name:",
    },
    email: {
      isValid: false,
      message: "Your email:",
    },

    password: {
      isValid: false,
      message: "Set a password:",
    },

    username: {
      isValid: false,
      message: "Your username:",

    },
    dob: {
      isValid: false,
      message: "Select your date of birth:",

    },
    gender: {
      isValid: false,
      message: "Select your gender:",
    }
  });
  const [verifyOtp, setVerifyOtp] = useState({
    showOtpField: false,
    isVerfied: false
  });

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setStatusBar({
      color: Colors.primary,
      style: 'dark-content'
    }))
  }, [])

  useEffect(() => {
    setUsername(email.split('@')[0]);
    setIsInputValid((prev) => ({
      ...prev, username: {
        isValid: true,
        message: "",
      }
    }))

  }, [email])



  // Override back button press
  useEffect(() => {
    const backAction = () => {
      if (step > 1) {
        setStep(step - 1);
        return true;
      } else {
        Alert.alert(strings.title(appName), "Are you sure you want to exit?", [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          { text: "Exit", onPress: () => navigation.goBack() },
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [step, navigation]);


  const handleNextStep = () => {
    if (step < 3) {
      switch (step) {
        case 1:
          if (isInputValid.fullName.isValid && isInputValid.email.isValid && isInputValid.password.isValid) {


            setStep(step + 1);

          }
          break;
        case 2:
          if (isInputValid.dob.isValid && isInputValid.username.isValid && isInputValid.gender.isValid) {
            setStep(step + 1);
          }
          break;
        case 3:
          // console.log('Step 3 validation:', isInputValid.mobileNumber);
          // if (isInputValid.mobileNumber) {
          //   setStep(step + 1);
          // }
          break;
        default:
          break;
      }
    } else {
      handleSubmit();
    }
  };


  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };


  const handleverification = async () => {
    setIsLoading(true);
    if (otp.length == 4) {
      console.log('verifying otp')
      let user = new User()
      const otpByServer = await user.verifyEmail(email);
      console.log(otpByServer);
      if (otp == otpByServer.toString()) {
        setVerifyOtp({
          showOtpField: false,
          isVerfied: true
        })
      } else {
        Alert.alert(strings.title(appName), "Incorrect OTP")
      }
    }
  }

  const handleVerify = () => {

    if (isInputValid.email.isValid) {
      setVerifyOtp({
        showOtpField: true,
        isVerfied: false
      })




    } else {
      Alert.alert(strings.title(appName), "Please a enter valid email")
    }
  }
  const handleSubmit = () => {
    //validate form
    try {
      const yupResponse = RegisterSchema.validate({
        fullName,
        email,
        password,
        gender,
        dob,
        username,


      }, { abortEarly: false });
      console.log(yupResponse);
    } catch (error: any) {
      Alert.alert(strings.title(appName), error.message);
    }
  };
  // useEffect(() => {
  //   console.log(isInputValid)
  //   console.log(verifyOtp)
  // }, [isInputValid,verifyOtp])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => {
          if (step > 1) {
            setStep(step - 1);
          }
          else {
            navigation.goBack();
          }
        }}>
          <Icon name="arrow-back" size={35} color={Colors.blueLight} />
        </TouchableOpacity>
        {/* steps */}
        <Text style={styles.stepsText}>Step {step} of 6</Text>


      </View>
      <ScrollView style={styles.bodyForm}>

        {
          (step == 1 || step == 2) ? (
            <>
              <Text style={styles.headerTitle}>Sign Up to {strings.title(appName)}</Text>
              <Text style={{
                fontSize: 16,
                color: Colors.inputColor,
                marginBottom: 40,

              }}>Please fill these forms to proceed</Text>
            </>
          ) : (
            <>
              <Text style={styles.headerTitle}>Just a last step!</Text>
              <Text style={{
                fontSize: 16,
                color: Colors.inputColor,
                marginBottom: 40,

              }}>Select your profile pic.</Text>
            </>
          )
        }

        {step === 1 && (

          <View>
            <Text style={[styles.label, {
              color: isInputValid.fullName.isValid ? Colors.inputColor : 'red'
            }]}>{
                isInputValid.fullName.isValid ? "Full Name:" : isInputValid.fullName.message
              }</Text>
            <TextInput
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                try {
                  // RegisterSchema.validateSync({ fullName: text }, { abortEarly: false });
                  yup.string().required().min(3).max(50).matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Please enter valid name').validateSync(text, { abortEarly: false })
                  setIsInputValid((prev) => ({
                    ...prev, fullName: {
                      isValid: true,
                      message: "",
                    }
                  }));
                } catch (error) {
                  console.log(error);
                  setIsInputValid({
                    ...isInputValid, fullName: {
                      isValid: false,
                      message: 'Not a valid name',
                    }
                  });

                }

              }}
              placeholder="Enter your full name"
              style={styles.input}
              cursorColor={Colors.blue}

            />


            <View>
              <Text style={[styles.label, {
                color: isInputValid.email.isValid ? Colors.inputColor : 'red'
              }]}>{
                  isInputValid.email.isValid ? "Email Address:" : isInputValid.email.message
                }</Text>
              <View style={styles.phoneConatiner}>
                <TextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text)
                    try {
                      yup.string().required().email().validateSync(text, { abortEarly: false })
                      setIsInputValid((prev) => ({
                        ...prev, email: {
                          isValid: true,
                          message: "",
                        }
                      }));

                    } catch (error) {
                      setIsInputValid((prev) => ({
                        ...prev, email: {
                          isValid: false,
                          message: 'Not a valid email address',
                        }

                      }));

                    }
                  }}
                  placeholder="Email Address"
                  style={[styles.input, { flex: 1, marginRight: 10, letterSpacing: 1 }]}
                  cursorColor={Colors.blue}
                  keyboardType='email-address'
                  maxLength={120}
                />
                {
                  !verifyOtp.showOtpField && (
                    <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
                      <Text style={{ color: Colors.blue }}>Verify</Text>
                    </TouchableOpacity>
                  )
                }

              </View>
              {
                verifyOtp.showOtpField && isInputValid.email.isValid ? (
                  <>
                    <Text style={[styles.label, {
                      color: isInputValid ? Colors.inputColor : 'red'
                    }]}>OTP:</Text>
                    <View style={styles.phoneConatiner}>

                      <TextInput
                        value={otp}
                        onChangeText={(text) => {
                          setOtp(text)
                        }}
                        placeholder="Enter 4-digit OTP here"
                        style={[styles.input, { flex: 1, marginRight: 10 }]}
                        cursorColor={Colors.blue}
                        keyboardType="numeric"
                        maxLength={4}


                      />
                      {
                        verifyOtp.showOtpField && (
                          <TouchableOpacity disabled={isLoading} style={styles.verifyBtn} onPress={handleverification}>
                            <Text style={{ color: Colors.blue }}> {isLoading?'Verifying..':'Verify'} </Text>
                          </TouchableOpacity>
                        )
                      }
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={{
                      fontSize: 14,
                      color: Colors.inputColor,
                      marginBottom: 15,

                    }}>
                      Please click verify button, we will send you a 4-digit OTP to verify your email.
                    </Text>
                  </>
                )
              }
            </View>




            <Text style={[styles.label, {
              color: isInputValid.password.isValid ? Colors.inputColor : 'red'
            }]}>{
                isInputValid.password.isValid ? "Password:" : isInputValid.password.message


              }</Text>
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text)
                try {
                  // passowrd should conatinas atleast one uppercase, one lowercase, one number and one special character
                  yup.string().required().min(8).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, 'Password should contain atleast one uppercase, one lowercase, one number and one special character').validateSync(text, { abortEarly: false })


                  setIsInputValid((prev) => ({
                    ...prev, password: {
                      isValid: true,
                      message: "",
                    }
                  }));

                } catch (error) {
                  setIsInputValid((prev) => ({
                    ...prev, password: {
                      isValid: false,
                      message: 'Password should contain atleast one uppercase, one lowercase, one number and one special character'
                    }
                  }));

                }
              }}
              placeholder="Set your password"
              secureTextEntry
              style={styles.input}
              cursorColor={Colors.blue}

            />
          </View>
        )}


        {step === 2 && (
          <View>
            <Text style={[styles.label, {
              color: isInputValid.dob.isValid ? Colors.inputColor : 'red'
            }]}>{
                isInputValid.dob.isValid ? "Date of Birth(DD - MM - YYYY) :" : isInputValid.dob.message


              }</Text>
            {/* <TextInput
              value={dob}
              onChangeText={(text) => {
                setDob(text)
                try {
                  RegisterSchema.validateSync({ dob: text }, { abortEarly: false });
                  setIsInputValid((prev) => ({ ...prev, dob: true }));

                } catch (error) {
                  setIsInputValid((prev) => ({ ...prev, dob: false }));

                }
              }}
              placeholder="Enter your date of birth"
              style={styles.input}
              cursorColor={Colors.blue}
            /> */}
            <TouchableOpacity onPress={() => setOpenDatePicker(true)} style={[styles.input, { justifyContent: 'center' }]} >
              <Text style={{ color: Colors.inputColor, marginBottom: 10 }}>{parseDate(dob)}</Text>
            </TouchableOpacity>

            <DatePicker
              date={new Date(dob)}
              modal={true}
              maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 16))}
              minimumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 70))}
              open={openDatePicker}
              onConfirm={(date) => {
                setDob(date.toISOString())
                try {
                  yup.date().required().max(new Date(new Date().setFullYear(new Date().getFullYear() - 16))).min(new Date(new Date().setFullYear(new Date().getFullYear() - 70))).validateSync(date, { abortEarly: false })
                  setIsInputValid((prev) => ({
                    ...prev, dob: {
                      isValid: true,
                      message: "",
                    }
                  }));

                } catch (error) {
                  setIsInputValid((prev) => ({
                    ...prev, dob: {
                      isValid: false,
                      message: 'You must be atleast 16 years old'
                    }
                  }));

                }
                setOpenDatePicker(false)
              }}
              onCancel={() => setOpenDatePicker(false)}

              // onDateChange={(date) => {
              //   setDob(date.toISOString())
              //   try {
              //     RegisterSchema.validateSync({ dob: date.toString() }, { abortEarly: false });
              //     setIsInputValid((prev) => ({ ...prev, dob: true }));

              //   } catch (error) {
              //     setIsInputValid((prev) => ({ ...prev, dob: false }));

              //   }
              // }}
              mode="date"
              textColor={Colors.inputColor}
              style={{ marginBottom: 20 }}
            />


            <Text style={[styles.label, {
              color: isInputValid.gender.isValid ? Colors.inputColor : 'red'
            }]}>
              {
                isInputValid.gender.isValid ? "Gender" : isInputValid.gender.message
              }
            </Text>
            {/* <TextInput
              value={gender}
              onChangeText={(text)=>{
                setGender(text)
                try {
                  RegisterSchema.validateSync({ gender:text }, { abortEarly: false });
                  setIsInputValid((prev) => ({ ...prev, gender: true }));
                  
                } catch (error) {
                  setIsInputValid((prev) => ({ ...prev, gender: false }));

                }
              }}
              placeholder="Enter your gender"
              style={styles.input}
              cursorColor={Colors.blue}
            /> */}
            <RNPickerSelect
              style={[styles.input, { marginTop: 10, borderWidth: 0 }]}
              items={genders}
              open={openGender}
              placeholder='Select your gender'
              setOpen={() => {
                setOpenGender(!openGender)
              }}
              setValue={(text) => {
                setGender(text);
                try {
                  yup.string().required().validateSync(text, { abortEarly: false })
                  setIsInputValid((prev) => ({
                    ...prev, gender: {
                      isValid: true,
                      message: "",
                    }
                  }));
                } catch (error) {
                  setIsInputValid((prev) => ({
                    ...prev, gender: {
                      isValid: false,
                      message: 'Gender is required'
                    }
                  }));
                }
              }}
              multiple={false} // Add the 'multiple' property
              value={gender} // Add the 'value' property
            />


            <Text style={[styles.label, {
              color: isInputValid.username.isValid ? Colors.inputColor : 'red'
            }]}>{
                isInputValid.username.isValid ? "Username:" : isInputValid.username.message
              }</Text>
            <TextInput
              value={username}
              onChangeText={(text) => {
                setUsername(text)
                try {
                  yup.string().required().min(3).max(20).matches(/^[a-zA-Z0-9]+$/, 'Please enter valid username').validateSync(text, { abortEarly: false })
                  setIsInputValid((prev) => ({
                    ...prev, username: {
                      isValid: true,
                      message: "",
                    }
                  }));

                } catch (error) {
                  setIsInputValid((prev) => ({
                    ...prev, username: {
                      isValid: false,
                      message: 'Username should contain only letters and numbers',

                    }
                  }));

                }
              }}
              placeholder="Create a username"
              style={styles.input}
              cursorColor={Colors.blue}

            />
          </View>
        )}

        {step === 3 && (
          <>
            <SelectFile
              fileType={fileTypes.image}
              onSelect={(file) => {
                setProfileImage(file[0])
              }}
              onCancel={() => {

              }}
            >
              <View style={[styles.selectProfile]}>
                {
                  (profileImage.uri) ? (
                    <Image
                      style={styles.selectProfileImage}
                      source={{ uri: profileImage.uri }}
                    />
                  ) : (
                    <>
                      <Image
                        style={styles.selectProfileImage}
                        source={(gender == 'female') ? require('../assets/images/woman.png') : require('../assets/images/man.png')}
                      />
                      <Icon style={styles.selectIcon} name='add' size={40} color={Colors.inputColor} />

                    </>
                  )
                }


              </View>
            </SelectFile>
          </>
        )}


        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.btn} onPress={handleNextStep}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{
              step < 3 ? "Next" : "Submit"
            }</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    // marginBottom: 30,
    flex: 1,
    padding: 30,


  },
  stepsText: {
    color: Colors.blueLight,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 15,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: Colors.textColor,

    marginBottom: 8
  },
  backBtn: {
    marginRight: 20,
    marginTop: 20,
  },
  btn: {
    backgroundColor: Colors.blue,
    fontWeight: 'bold',
    marginLeft: 5,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyForm: {
    // marginTop: -100,
    padding: 35,


  },
  label: {
    fontSize: 13,
    marginBottom: 3,
    color: Colors.inputColor
  },
  input: {

    fontSize: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#d6d8d6',
    borderRadius: 5,
    color: Colors.inputColor,
    letterSpacing: 1,
    fontWeight: 'bold',


  },
  phoneConatiner: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verifyBtn: {
    backgroundColor: Colors.bgApp,
    padding: 10,
    borderRadius: 5,
    // position: 'absolute',
    right: 0,
    top: -10
  },
  buttonContainer: {
    marginTop: 20,

  },
  selectProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.inputColor,
    borderStyle: 'dashed',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20
  },
  selectProfileImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginRight: 20
  },
  selectIcon: {
    marginLeft: -80,
    color: Colors.blueLight,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    marginBottom: -150
  }

});

export default Register;
