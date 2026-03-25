import './style.css'
import { auth } from './firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const appDiv = document.querySelector<HTMLDivElement>('#app')!;

function renderLanding() {
  appDiv.innerHTML = `
    <div class="auth-container">
      <div class="logo-container" id="logo-trigger">
        <img src="/src/assets/logo.png" alt="Mel in a Box Logo" class="landing-logo">
        <p style="margin-top: 10px; font-weight: 500;">Click to get started</p>
      </div>
      
      <div class="auth-actions" id="auth-buttons">
        <button class="btn btn-primary" id="go-login">Log In</button>
        <button class="btn btn-outline" id="go-signup">Sign Up</button>
      </div>
    </div>
  `;

  const logoTrigger = document.getElementById('logo-trigger')!;
  const authButtons = document.getElementById('auth-buttons')!;
  const goLogin = document.getElementById('go-login')!;
  const goSignup = document.getElementById('go-signup')!;

  logoTrigger.addEventListener('click', () => {
    authButtons.classList.toggle('visible');
  });

  goLogin.addEventListener('click', renderLogin);
  goSignup.addEventListener('click', renderSignup);
}

function renderLogin() {
  appDiv.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Log in</h2>
        
        <form id="login-form">
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="login-email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="login-password" placeholder="••••••••" required>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; margin-bottom: 1rem;">
            <label><input type="checkbox"> Remember for 30 days</label>
            <a href="#" style="color: var(--mel-pink); text-decoration: none;">Forgot password</a>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full">Sign in</button>
        </form>
        
        <button class="google-btn" id="google-login">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google">
          Sign in with Google
        </button>
        
        <div class="auth-footer">
          Don't have an account? <a href="#" id="link-signup">Sign up</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form')!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
    } catch (error: any) {
      alert(error.message);
    }
  });

  document.getElementById('google-login')!.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Logged in with Google!');
    } catch (error: any) {
      alert(error.message);
    }
  });

  document.getElementById('link-signup')!.addEventListener('click', (e) => {
    e.preventDefault();
    renderSignup();
  });
}

function renderSignup() {
  appDiv.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Create your account</h2>
        <p>Sign up</p>
        
        <form id="signup-form">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="signup-name" placeholder="Enter your name" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="signup-email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="signup-password" placeholder="••••••••" required>
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" id="signup-confirm" placeholder="••••••••" required>
          </div>
          
          <div style="text-align: left; font-size: 0.8rem; margin-bottom: 1rem;">
            <label><input type="checkbox" required> I agree to the Terms of Service, Privacy Policy, and Cookie Policy</label>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full">Sign Up</button>
        </form>
        
        <button class="google-btn" id="google-signup-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google">
          Sign in with Google
        </button>
        
        <div class="auth-footer">
          Already have an account? <a href="#" id="link-login">Sign In</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('signup-form')!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('signup-email') as HTMLInputElement).value;
    const password = (document.getElementById('signup-password') as HTMLInputElement).value;
    const confirm = (document.getElementById('signup-confirm') as HTMLInputElement).value;

    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
    } catch (error: any) {
      alert(error.message);
    }
  });

  document.getElementById('google-signup-btn')!.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Signed up with Google!');
    } catch (error: any) {
      alert(error.message);
    }
  });

  document.getElementById('link-login')!.addEventListener('click', (e) => {
    e.preventDefault();
    renderLogin();
  });
}

function renderDashboard(user: any) {
  appDiv.innerHTML = `
    <div class="auth-container">
      <h1>Welcome, ${user.email}</h1>
      <p>Successfully authenticated!</p>
      <button class="btn btn-secondary" id="logout">Logout</button>
    </div>
  `;

  document.getElementById('logout')!.addEventListener('click', () => {
    signOut(auth);
  });
}

// Initial session check
onAuthStateChanged(auth, (user) => {
  if (user) {
    renderDashboard(user);
  } else {
    renderLanding();
  }
});
