# 🎯 CrowdCube - Modern Crowdfunding Platform

<div align="center">

![CrowdCube Logo](public/cube.jpg)

**A feature-rich, modern crowdfunding platform built with React and cutting-edge web technologies**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.0.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

**[🌐 Live Demo](https://your-live-site-link.com) • [📝 Documentation](#documentation) • [🚀 Getting Started](#getting-started)**

</div>

---

## ✨ Features

### 🎨 **Modern User Interface**
- **Glassmorphism Design**: Beautiful blur effects and transparent elements
- **Responsive Layout**: Seamless experience across all devices
- **Dark/Light Theme**: Adaptive color schemes
- **Professional Typography**: Google Fonts integration (Poppins, Inter)

### 🔐 **Authentication & Security**
- **Firebase Authentication**: Secure user management
- **Protected Routes**: Private route protection
- **Authorization Controls**: Campaign ownership verification
- **Secure Sessions**: Persistent login state

### 📊 **Campaign Management**
- **Create Campaigns**: Rich campaign creation with image uploads
- **Edit & Delete**: Full CRUD operations with SweetAlert2 confirmations
- **Campaign Types**: Personal Issues, Startups, Business, Creative Ideas
- **Deadline Management**: Automatic expiration detection and status updates
- **Goal Tracking**: Real-time progress visualization

### 💰 **Donation System**
- **Interactive Donation Modal**: Glassmorphism donation interface
- **Minimum Donation Control**: Configurable minimum amounts
- **Real-time Updates**: Instant donation tracking
- **Donation History**: Complete donation timeline with pagination
- **Toast Notifications**: Beautiful success/error feedback

### 📱 **Advanced Features**
- **Pagination System**: 6-items-per-page with smooth navigation
- **Search & Filter**: Advanced campaign discovery
- **Responsive Cards**: Consistent layout across all screen sizes
- **Loading States**: Smooth loading animations
- **Error Handling**: Comprehensive error management

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend** | React | 19.1.0 | UI Framework |
| **Build Tool** | Vite | 7.0.4 | Fast development & building |
| **Styling** | TailwindCSS | 4.1.11 | Utility-first styling |
| **UI Components** | DaisyUI | 5.0.50 | Pre-built components |
| **Routing** | React Router | 7.7.1 | Client-side routing |
| **Authentication** | Firebase | 12.0.0 | User management |
| **Notifications** | React Toastify | 11.0.5 | Toast messages |
| **Modals** | SweetAlert2 | 11.22.2 | Beautiful alerts |
| **Icons** | React Icons | 5.5.0 | Icon library |
| **Animations** | React CountUp | 6.5.3 | Number animations |
| **Carousel** | React Responsive Carousel | 3.2.23 | Image slideshows |

</div>

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MostafijurRuman/CrowdCube.git
   cd CrowdCube
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
CrowdCube/
├── 📁 public/
│   └── cube.jpg                 # Application logo
├── 📁 src/
│   ├── 📁 Components/
│   │   ├── Footer.jsx           # Footer component
│   │   ├── Header.jsx           # Navigation header
│   │   ├── MyCampaignsTable.jsx # Campaign management table
│   │   └── MyDonationCard.jsx   # Donation history cards
│   ├── 📁 Contexts/
│   │   └── AuthContext.jsx      # Authentication context
│   ├── 📁 Layouts/
│   │   └── MainLayout.jsx       # Main application layout
│   ├── 📁 Pages/
│   │   ├── AddCampaign.jsx      # Campaign creation
│   │   ├── AllCampaign.jsx      # Campaign browsing
│   │   ├── CampaignDetails.jsx  # Individual campaign view
│   │   ├── EditCampaign.jsx     # Campaign editing
│   │   ├── Home.jsx             # Landing page
│   │   ├── Login.jsx            # Authentication
│   │   ├── MyCampaign.jsx       # User's campaigns
│   │   ├── MyDonations.jsx      # Donation history
│   │   └── Register.jsx         # User registration
│   ├── 📁 Routes/
│   │   ├── PrivateRoutes.jsx    # Protected route wrapper
│   │   └── Router.jsx           # Application routing
│   ├── App.jsx                  # Main application component
│   ├── index.css                # Global styles
│   └── main.jsx                 # Application entry point
├── eslint.config.js             # ESLint configuration
├── package.json                 # Dependencies & scripts
├── tailwind.config.js           # TailwindCSS configuration
└── vite.config.js               # Vite configuration
```

---

## 🎯 Key Features Deep Dive

### 🔄 Donation Flow
1. **Browse Campaigns**: Users can explore active campaigns
2. **Select Campaign**: View detailed campaign information
3. **Donate**: Interactive modal with glassmorphism effects
4. **Confirmation**: SweetAlert2 success notification
5. **History**: Track donations in paginated history

### 🛡️ Security Features
- **Route Protection**: Private routes require authentication
- **Ownership Verification**: Users can only edit their own campaigns
- **Input Validation**: Form validation and sanitization
- **Secure Sessions**: Firebase authentication management

### 📊 Admin Dashboard
- **Campaign Management**: Create, edit, delete campaigns
- **Donation Tracking**: View all received donations
- **Analytics**: Campaign performance metrics
- **User Management**: Profile and settings

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Poppins (Bold, Semi-bold)
- **Body Text**: Inter (Regular, Medium)
- **Code**: Monaco, Menlo

### Components
- **Glassmorphism Effects**: backdrop-blur with transparency
- **Gradient Backgrounds**: Smooth color transitions
- **Card Layouts**: Consistent spacing and shadows
- **Interactive Elements**: Hover states and animations

---

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Code Formatting
```bash
npm run format
```

---

## 📦 Deployment

### Vercel (Recommended)
1. Fork this repository
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow ESLint rules
- Use conventional commit messages
- Write meaningful comments
- Test your changes

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

<div align="center">

### 🚀 Built with ❤️ by

**[Mostafijur Ruman](https://github.com/MostafijurRuman)**  
*Full Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MostafijurRuman)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mostafijurruman)

</div>

---

## 📞 Support

If you have any questions or need help, please:

- 📧 Email: mostafijurruman7@gmail.com
- 🐛 [Report Issues](https://github.com/MostafijurRuman/CrowdCube/issues)
- 💬 [Start Discussion](https://github.com/MostafijurRuman/CrowdCube/discussions)

---

## 🙏 Acknowledgments

- [React Team](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Firebase](https://firebase.google.com/) for authentication services
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [DaisyUI](https://daisyui.com/) for beautiful UI components

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

[![Stars](https://img.shields.io/github/stars/MostafijurRuman/CrowdCube?style=social)](https://github.com/MostafijurRuman/CrowdCube/stargazers)
[![Forks](https://img.shields.io/github/forks/MostafijurRuman/CrowdCube?style=social)](https://github.com/MostafijurRuman/CrowdCube/network)

</div>
