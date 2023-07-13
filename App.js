import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useGuardSecure} from '@abtguard/guard';

const App = () => {
  const [response, setResponse] = React.useState('');
  const [customerId, setCustomerId] = React.useState('1');
  const [loginPin, setLoginPin] = React.useState('123456');
  const [pin, setPin] = React.useState('123456');
  const [newPin, setNewPin] = React.useState('121212');
  const [txPin, setTxPin] = React.useState('123456');

  const {
    store: {
      initGuard,
      createPin,
      login,
      getSignedPin,
      getDeviceId,
      setRememberPinStatus,
      changePin,
      approveTransaction,
      logout,
      generateTOTP,
      getMobileNotificationTransaction,
      checkActivation,
    },
  } = useGuardSecure();

  const onPressInit = async () => {
    setResponse('Please wait...');
    try {
      const res = await initGuard();
      setResponse(JSON.stringify(res));
    } catch (error) {
      setResponse('ERROR :/');
    }
  };
  const onPressLogin = async () => {
    setResponse('Please wait...');
    try {
      const res = await login({
        pin: loginPin,
        customerId,
        //rememberPinActive: false,
        //guardSdkVersion: '0.3.3',
      });
      setResponse(JSON.stringify(res));
    } catch (error) {
      setResponse('ERROR :/');
    }
  };
  const onPressCreatePin = async () => {
    setResponse('Please wait...');
    try {
      const res = await createPin({pin: pin, customerId});
      setResponse(JSON.stringify(res));
    } catch (error) {
      setResponse('ERROR :/');
    }
  };
  const onPressApproveTransaction = async () => {
    setResponse('Please wait...');
    try {
      const res = await approveTransaction({
        pin: txPin,
        customerId,
        canceled: false,
        isPinless: false,
        summaryData: "{ 'key': 'value' }",
      });
      setResponse(JSON.stringify(res));
    } catch (error) {
      setResponse('ERROR :/');
    }
  };
  const onPressChangePin = async () => {
    setResponse('Please wait...');
    try {
      const res = await changePin({
        pin: pin,
        customerId,
        newPin: newPin,
      });
      setResponse(JSON.stringify(res));
    } catch (error) {
      setResponse('ERROR :/');
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>GUARD</Text>

      <TextInput
        style={styles.customerIdInput}
        value={customerId}
        onChangeText={setCustomerId}
        maxLength={8}
      />

      <View style={styles.buttonContainer}>
        <View>
          <Button onPress={onPressInit} title="JS INIT" />
        </View>

        <View>
          <Button onPress={onPressCreatePin} title="Create Pin" />
          <TextInput
            style={styles.pinInput}
            value={pin}
            onChangeText={setPin}
            maxLength={8}
          />
        </View>

        <View>
          <Button onPress={onPressLogin} title="Login" />
          <TextInput
            style={styles.pinInput}
            value={loginPin}
            onChangeText={setLoginPin}
            maxLength={8}
          />
        </View>

        <View>
          <Button onPress={onPressApproveTransaction} title="Approve Trn." />
          <TextInput
            style={styles.pinInput}
            value={txPin}
            onChangeText={setTxPin}
            maxLength={8}
          />
        </View>

        <View>
          <Button onPress={onPressChangePin} title="CHANGEPIN" />
          <TextInput
            style={styles.pinInput}
            value={newPin}
            onChangeText={setNewPin}
            maxLength={8}
          />
        </View>
      </View>

      <View style={styles.responseContainer}>
        <Text style={styles.responseText}>{response}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
  },
  responseContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: 'red',
  },
  responseText: {
    fontSize: 18,
    fontWeight: '600',
    width: '100%',
    textAlign: 'center',
  },

  customerIdInput: {
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 0,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 0,
  },
});

export default App;
