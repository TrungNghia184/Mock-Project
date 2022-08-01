import  i18n  from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"

i18n.use(initReactI18next).init({
    debug: true,
    resources: {
      en: { 
        translation: {
            welcomeTo: "Welcome to CovidGlobal",
            welcomeBack: "Welcome  back to CovidGlobal",
            welcomeSignUp: "Please sign up so you can see the work of our data analysist team",
            welcomeSignIn: "Please sign in to continue getting the latest Covid infomation",
            username: "Username",
            password: "Password",
            moreThan2: " must have more than 2 characters!",
            lessThan16: " must have less than 16 characters!",
            lowerCaseOnly: "must only contains lowercase letters",
            required: " is a required field",
            register: "Register",
            login: 'Login',
            logout: 'Logout',
            signUp: "Sign Up",
            signIn: "Sign In",
            home: 'Home',
            news: 'News',
            confirmed: 'Confirmed cases',
            recovered: 'Recovered cases',
            deaths: 'Death cases',
            goToCountryDetail: 'Go to country detail',
            chartData: 'Chart data',
            breakingNews: 'Breaking News',
            relatedNews: 'Related News',
            detailOf: 'Detail of',
            selectCountry: 'Please select a country',
        }
       },
      vie: { 
        translation: {
            welcomeTo: "Đây là CovidGlobal",
            welcomeBack: "Trở lại với CovidGlobal",
            welcomeSignUp: "Hãy đăng kí để xem dữ liệu mới nhất về covid từ các chuyên gia của chúng tôi",
            welcomeSignIn: "Hãy đăng nhập để tiếp tục có những thông tin mới nhất về Covid",
            username: "Tên đăng nhập",
            password: "Mật khẩu",
            moreThan2: " phải có nhiều hơn 2 kí tự!",
            lessThan16: " phải có ít hơn 16 kí tự!",
            lowerCaseOnly: " chỉ được chứa chữ thường",
            required: " không được để trống",
            register: "Đăng kí tài khoản",
            login: 'Đăng nhập',
            logout: 'Đăng xuất',
            signUp: "Đăng kí mới",
            signIn: "Đăng nhập",
            home: 'Trang chủ',
            news: 'Tin tức',
            confirmed: 'Số người nhiễm',
            recovered: 'Số ca phục hồi',
            deaths: 'Số ca tử vong',
            goToCountryDetail: 'Chi tiết từng quốc gia',
            chartData: 'Biểu đồ, bản đồ Covid',
            breakingNews: 'Tin chính',
            relatedNews: 'Các tin liên quan',
            detailOf: 'Thông tin chi tiết của nước',
            selectCountry: 'Hãy chọn một quốc gia'
        }
       },
    },
    lng: "en",
    fallbackLng: "vie",
    interpolation: { escapeValue: false },
  });
