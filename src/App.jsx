import { useState } from 'react'
import { RoleProvider } from './RoleContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EmergencyBar from './components/EmergencyBar'
import HomePage from './pages/HomePage'
import GrowthMilestonesPage from './pages/GrowthMilestonesPage'
import GrowthChartPage from './pages/GrowthChartPage'
import CommonSymptomsPage from './pages/CommonSymptomsPage'
import VaccinationPage from './pages/VaccinationPage'
import DietaryPage from './pages/DietaryPage'
import EmergencyPage from './pages/EmergencyPage'
import MedicationPage from './pages/MedicationPage'
import CommonDiseasesPage from './pages/CommonDiseasesPage'
import VitalSignsPage from './pages/VitalSignsPage'
import EarlyLearningPage from './pages/EarlyLearningPage'
import CaregiverToolsPage from './pages/CaregiverToolsPage'
import NewbornSafetyPage from './pages/NewbornSafetyPage'
import HomeSafetyPage from './pages/HomeSafetyPage'
import DailyCarePage from './pages/DailyCarePage'
import ParentSupportPage from './pages/ParentSupportPage'
import CaregiverProfessionalPage from './pages/CaregiverProfessionalPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [navParam, setNavParam] = useState(null)

  const navigate = (page, param = null) => {
    setCurrentPage(page)
    setNavParam(param)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':       return <HomePage navigate={navigate} />
      case 'growth':     return <GrowthMilestonesPage navigate={navigate} initialAgeId={navParam} />
      case 'growth-chart': return <GrowthChartPage navigate={navigate} />
      case 'symptoms':   return <CommonSymptomsPage navigate={navigate} />
      case 'vaccination':return <VaccinationPage navigate={navigate} initialTab={navParam} />
      case 'dietary':    return <DietaryPage navigate={navigate} />
      case 'emergency':  return <EmergencyPage navigate={navigate} />
      case 'medication': return <MedicationPage navigate={navigate} />
      case 'diseases':   return <CommonDiseasesPage navigate={navigate} />
      case 'vitals':     return <VitalSignsPage navigate={navigate} />
      case 'early-learning': return <EarlyLearningPage navigate={navigate} />
      case 'caregiver':  return <CaregiverToolsPage navigate={navigate} />
      case 'newborn-safety': return <NewbornSafetyPage navigate={navigate} />
      case 'home-safety': return <HomeSafetyPage navigate={navigate} />
      case 'daily-care': return <DailyCarePage navigate={navigate} />
      case 'parent-support': return <ParentSupportPage navigate={navigate} initialTab={navParam} />
      case 'caregiver-professional': return <CaregiverProfessionalPage navigate={navigate} />
      default:           return <HomePage navigate={navigate} />
    }
  }

  return (
    <RoleProvider>
      <div className="min-h-screen bg-morandi-secondary flex flex-col">
        <Navbar navigate={navigate} currentPage={currentPage} />
        <EmergencyBar navigate={navigate} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer navigate={navigate} />
      </div>
    </RoleProvider>
  )
}

export default App
