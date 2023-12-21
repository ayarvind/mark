import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, BackHandler, Pressable, SafeAreaView } from 'react-native';
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
const Register = ({ navigation }: { navigation: any }): React.JSX.Element => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString());
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [openGender, setOpenGender] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [isInputValid, setIsInputValid] = useState({
    fullName: true,
    email: true,
    password: true,
    mobileNumber: true,
    username: true,
    dob: true,
    gender: true

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
      setStep(step + 1);
    } else {
      // Handle form submission when on the last step
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleVerify = () => {
    // Handle phone number verification here
    // You can access the phone number from the mobileNumber state variable
    if (mobileNumber.length == 10) {
      setVerifyOtp({
        showOtpField: true,
        isVerfied: false
      })
    }else{
      Alert.alert(strings.title(appName),"Please enter valid phone number")
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
        phone: mobileNumber,
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

              }}>Enter your phone number & join us now.</Text>
            </>
          )
        }

        {step === 1 && (

          <View>
            <Text style={[styles.label, {
              color: isInputValid.fullName ? Colors.inputColor : 'red'
            }]}>{
                isInputValid.fullName ? "Full Name:" : "Please enter valid name"
              }</Text>
            <TextInput
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                try {
                  RegisterSchema.validateSync({ fullName: text }, { abortEarly: false });

                  setIsInputValid((prev) => ({ ...prev, fullName: true }));
                } catch (error) {
                  setIsInputValid({ ...isInputValid, fullName: false });

                }

              }}
              placeholder="Enter your full name"
              style={styles.input}
              cursorColor={Colors.blue}

            />
            <Text style={[styles.label, {
              color: isInputValid.email ? Colors.inputColor : 'red'
            }]}>{
                isInputValid.email ? "Email:" : "Please enter valid email"

              }</Text>
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                try {
                  RegisterSchema.validateSync({ email: text }, { abortEarly: false });
                  setIsInputValid((prev) => ({ ...prev, email: true }));
                } catch (error) {
                  setIsInputValid((prev) => ({ ...prev, email: false }));

                }
              }}
              placeholder="Enter your email"
              style={styles.input}
              cursorColor={Colors.blue}

            />
            <Text style={[styles.label, {
              color: isInputValid.password ? Colors.inputColor : 'red'
            }]}>{
                isInputValid.password ? "Password:" : "Please enter valid password"


              }</Text>
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text)
                try {
                  RegisterSchema.validateSync({ password: text }, { abortEarly: false });
                  setIsInputValid((prev) => ({ ...prev, password: true }));

                } catch (error) {
                  setIsInputValid((prev) => ({ ...prev, password: false }));

                }
              }}
              placeholder="Enter your password"
              secureTextEntry
              style={styles.input}
              cursorColor={Colors.blue}

            />
          </View>
        )}


        {step === 2 && (
          <View>
            <Text style={[styles.label, {
              color: isInputValid.dob ? Colors.inputColor : 'red'
            }]}>{
                isInputValid.dob ? "Date of Birth(DD - MM - YYYY) :" : "Please enter valid date of birth"


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
              <Text style={{ color: Colors.inputColor }}>{parseDate(dob)}</Text>
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
                  RegisterSchema.validateSync({ dob: date.toString() }, { abortEarly: false });
                  setIsInputValid((prev) => ({ ...prev, dob: true }));

                } catch (error) {
                  setIsInputValid((prev) => ({ ...prev, dob: false }));

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
              color: isInputValid.gender ? Colors.inputColor : 'red'
            }]}>
              {
                isInputValid.gender ? "Gender" : "Please select you gender"
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
            style={[styles.input,{marginTop:10,borderWidth:0}]}
              items={genders}
              open={openGender}
              placeholder='Select your gender'
              setOpen={() => {
                setOpenGender(!openGender)
              }}
              setValue={(text) => {
                setGender(text);
                try {
                  RegisterSchema.validateSync({ gender: text }, { abortEarly: false });
                  setIsInputValid((prev) => ({ ...prev, gender: true }));
                } catch (error) {
                  setIsInputValid((prev) => ({ ...prev, gender: false }));
                }
              }}
              multiple={false} // Add the 'multiple' property
              value={gender} // Add the 'value' property
            />
   

            <Text style={[styles.label, {
              color: isInputValid.username ? Colors.inputColor : 'red'
            }]}>{
                isInputValid.username ? "Username:" : "Please enter valid username"
              }</Text>
            <TextInput
              value={username}
              onChangeText={(text) => {
                setUsername(text)
                try {
                  RegisterSchema.validateSync({ username: text }, { abortEarly: false });
                  setIsInputValid((prev) => ({ ...prev, username: true }));

                } catch (error) {
                  setIsInputValid((prev) => ({ ...prev, username: false }));

                }
              }}
              placeholder="Create a username"
              style={styles.input}
              cursorColor={Colors.blue}

            />
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={[styles.label, {
              color: isInputValid.mobileNumber ? Colors.inputColor : 'red'
            }]}>{
                isInputValid.mobileNumber ? "Phone Number:" : "Please enter valid phone number"
              }</Text>
            <View style={styles.phoneConatiner}>
              <TextInput
                value={mobileNumber}
                onChangeText={(text) => {
                  setMobileNumber(text)
                  try {
                    RegisterSchema.validateSync({ phone: text }, { abortEarly: false });
                    setIsInputValid((prev) => ({ ...prev, mobileNumber: true }));

                  } catch (error) {
                    setIsInputValid((prev) => ({ ...prev, mobileNumber: true }));

                  }
                }}
                placeholder="Enter your phone number here"
                style={styles.input}
                cursorColor={Colors.blue}
                keyboardType='phone-pad'
                maxLength={10}
              />
              <TouchableOpacity onPress={handleVerify} style={styles.verifyBtn}>
                <Text style={{ color: Colors.blue, fontWeight: 'bold' }}>Verify</Text>
              </TouchableOpacity>
            </View>
            {
              verifyOtp.showOtpField ? (
                <>
                  <Text style={[styles.label, {
                    color: isInputValid ? Colors.inputColor : 'red'
                  }]}>OTP:</Text>
                  <TextInput
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="Enter 4-digit OTP here"
                    style={[styles.input, { letterSpacing: 5 }]}
                    cursorColor={Colors.blue}
                    keyboardType="numeric"
                    maxLength={4}


                  />
                </>
              ) : (
                <>
                  <Text>
                    Please click verify button, we will send you a 4-digit OTP to verify your phone number.
                  </Text>
                </>
              )
            }
          </View>
        )}


        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.btn} onPress={
            () => {
              if (step < 3) {
                setStep(step + 1);
              } else {
                // Handle form submission when on the last step
                handleSubmit();
              }
            }
          }>
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
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputColor,


  },
  phoneConatiner: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  verifyBtn: {
    backgroundColor: Colors.bgApp,
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    top: -30
  },
  buttonContainer: {
    marginTop: 20,

  },
});

export default Register;
