import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useGuardSecure} from '@abtguard/guard';

const App = () => {
  const [response, setResponse] = React.useState('');
  const [customerId, setCustomerId] = React.useState('1');
  const [loginPin, setLoginPin] = React.useState('123456');
  const [pin, setPin] = React.useState('123456');
  const [newPin, setNewPin] = React.useState('121212');

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

  const onPressLogin = async () => {
    const res = await login({
      pin: loginPin,
      customerId: '1',
      rememberPinActive: false,
      guardSdkVersion: '2.5.0'
    });
    setResponse(JSON.stringify(res));
  };
  const onPressCreatePin = async () => {
    const res = await createPin({pin: '123456', customerId: '1'});
    setResponse(JSON.stringify(res));
  };
  const onPressChangePin = async () => {
    const res = await changePin({
      pin: '123456',
      newPin: '121212',
      customerId: '1',
    });
    setResponse(JSON.stringify(res));
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>GUARD</Text>

      <TextInput
        style={styles.customerIdInput}
        value={customerId}
        onChange={setCustomerId}
        maxLength={8}
      />

      <View style={styles.buttonContainer}>
        <View>
          <Button onPress={onPressLogin} title="Login" />
          <TextInput
            style={styles.pinInput}
            value={loginPin}
            onChange={setLoginPin}
            maxLength={8}
          />
        </View>

        <View>
          <Button onPress={onPressCreatePin} title="Create Pin" />
          <TextInput
            style={styles.pinInput}
            value={pin}
            onChange={setPin}
            maxLength={8}
          />
        </View>
        <View>
          <Button onPress={onPressChangePin} title="Change Pin" />
          <TextInput
            style={styles.pinInput}
            value={newPin}
            onChange={setNewPin}
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
    paddingTop: '20%',
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
    marginVertical: 20,
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
  },
  pinInput: {
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    textAlign: 'center',
  },
});

export default App;
