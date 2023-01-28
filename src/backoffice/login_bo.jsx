import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase_config';

function Login_bo() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate= useNavigate()


  return (
    <div>logiL</div>
  )
}

export default Login_bo