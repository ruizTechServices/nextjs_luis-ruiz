import DashboardHeader from "../components/main/dashboardHeader";
import JournalEntriesList from "../components/main/journal/journalEntriesList";
import JournalEntryForm from "../components/main/journal/journalEntryForm";
import ChatbotForm from "../components/main/chatbot";
import BitcoinPriceClock from "../components/main/bitcoinbot";
import Modal from "../components/ui/modal";

const Dashboard = () => {
    const [modalContent, setModalContent] = useState(null);
  
    const openModal = (contentComponent) => setModalContent(contentComponent);
    const closeModal = () => setModalContent(null);
  
    return (
      <>
        <DashboardHeader />
        <JournalEntriesList />
        <div className="container mx-auto w-80 mb-10 flex md:flex-row flex-col justify-center items-center gap-5">
          <button onClick={() => openModal(<JournalEntryForm />)} className="button-style">
            Add Journal Entry
          </button>
          <button onClick={() => openModal(<ChatbotForm />)} className="button-style">
            My Chatbot!
          </button>
          <button onClick={() => openModal(<BitcoinPriceClock />)} className="button-style">
            Bitcoin Price Status
          </button>
        </div>
  
        {modalContent && (
          <Modal isOpen={modalContent !== null} closeModal={closeModal}>
            {modalContent}
          </Modal>
        )}
      </>
    );
  };
  
  const buttonStyle = "px-4 py-2 mb-10 text-white bg-blue-500 hover:bg-blue-700 rounded";
  