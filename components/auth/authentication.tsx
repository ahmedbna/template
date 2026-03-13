import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { Pressable, Text, TextInput, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import { Image } from 'expo-image';

type AuthStep = 'signIn' | 'signUp';

export const Authentication = () => {
  const { signIn } = useAuthActions();

  const [step, setStep] = useState<AuthStep>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetFormState = () => {
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false);
  };

  const changeStep = (newStep: AuthStep) => {
    resetFormState();
    setStep(newStep);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (
      value.length < 8 ||
      !/\d/.test(value) ||
      !/[a-z]/.test(value) ||
      !/[A-Z]/.test(value)
    ) {
      setError(
        'Password must be 8+ characters with uppercase, lowercase, and numbers.',
      );
      return false;
    }
    setError('');
    return true;
  };

  const handleSignInUpSubmit = async () => {
    if (!validateEmail(email) || !validatePassword(password)) return;

    setLoading(true);
    setError('');

    try {
      await signIn('password', { email, password, flow: step });

      if (step === 'signUp') {
        setPassword('');
      }
    } catch (err: any) {
      console.error(`${step} error:`, err);
      setError('Authentication failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FAD40B' }}>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{
          gap: 16,
          padding: 16,
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            width: 200,
            height: 200,
            backgroundColor: '#FAD40B',
          }}
          source={require('../../assets/images/icon.png')}
          contentFit='cover'
          transition={1000}
        />

        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: error ? 'red' : 'gray',
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
            value={email}
            placeholder='me@example.com'
            placeholderTextColor={error ? 'red' : 'gray'}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            autoComplete='email'
            editable={!loading}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: error ? 'red' : 'gray',
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
            value={password}
            placeholder='Password'
            placeholderTextColor={error ? 'red' : 'gray'}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete={
              step === 'signIn' ? 'current-password' : 'new-password'
            }
            editable={!loading}
          />

          {!!error && (
            <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
          )}

          <Pressable
            onPress={handleSignInUpSubmit}
            disabled={loading}
            style={{ backgroundColor: '#000', padding: 10, borderRadius: 5 }}
          >
            <Text style={{ color: '#FFF' }}>
              {step === 'signIn' ? 'Login' : 'Create new account'}
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: step === 'signIn' ? 'row' : 'column',
              justifyContent: 'space-between',
            }}
          >
            <Pressable
              disabled={loading}
              style={{
                padding: 10,
                marginTop: step === 'signIn' ? 0 : 10,
                alignSelf: 'flex-start',
                backgroundColor: 'transparent',
              }}
              onPress={() =>
                changeStep(step === 'signIn' ? 'signUp' : 'signIn')
              }
            >
              <Text style={{ fontSize: 14, color: 'gray' }}>
                {step === 'signIn'
                  ? 'Create new account'
                  : 'Already have an account, Login'}
              </Text>
            </Pressable>
          </View>
        </View>

        <View>
          <Pressable
            style={{
              backgroundColor: 'lightgray',
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => void signIn('anonymous')}
          >
            <Text>Login anonymously</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </View>
  );
};
