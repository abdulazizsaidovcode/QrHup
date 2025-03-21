import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn } from '../../hooks/url';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const SignIn: React.FC = () => {
  const { t } = useTranslation()
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [roles, setRoles] = useState('');

  useEffect(() => {
    if (roles) {
      if (roles === "ROLE_ADMIN") navigate('/');
      else if (roles === "ROLE_MODERATOR") navigate('/moderator/clarify');
    }
  }, [roles])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!phoneNumber) {
      setError('Invalid phone number');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(LogIn, {
        phone: phoneNumber.slice(1),
        password,
      });
      if (response?.data?.data) {
        toast.success(t('Welcome'))
        sessionStorage.setItem('token', response?.data?.data?.token);
        sessionStorage.setItem('role', response?.data?.data?.role);
        setRoles(response?.data?.data?.role)
      } else {
        toast.error(t('InvalidPhone'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="rounded-sm border border-stroke bg-white shadow-default p-8 w-132.5">
        <h2 className="text-2xl text-center font-bold mb-4">{t("SignIn")}</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="phone" className="block font-medium mb-2">
              {t("PhoneNumber")}
            </label>
            <input
              id="phone"
              type="text"
              value={phoneNumber || "+998"}
              onChange={(e) => {
                let newValue = e.target.value;
                if (/^\+?\d*$/.test(newValue)) {
                  if (!newValue.startsWith("+998")) {
                    newValue = "+998";
                  }
                  if (newValue.length <= 13) {
                    setPhoneNumber(newValue);
                  }
                }
              }}
              placeholder="Telefon no'mer"
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-medium mb-2">
              {t("Password")}
            </label>
            <input
              id="password"
              type="password"
              placeholder="Parolingizni kiriting"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white flex justify-center items-center rounded-lg text-center py-3 font-medium transition hover:bg-opacity-90"
          >
            {loading ? <AiOutlineLoading3Quarters  className="animate-spin h-5 w-5 text-white" /> : 'Kirish'}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default SignIn;
