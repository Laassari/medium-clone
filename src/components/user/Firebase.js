import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyD3H-hAKV5VFKTeehFTc9EnAlfNV4lDsMg',
  authDomain: 'meduim-clone.firebaseapp.com',
  databaseURL: 'https://meduim-clone.firebaseio.com',
  projectId: 'meduim-clone',
  storageBucket: 'meduim-clone.appspot.com',
  messagingSenderId: '978295741901',
}

firebase.initializeApp(config)

const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true,
})

export default firebase
export {db, firebase}