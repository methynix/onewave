import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser'; // Import EmailJS
import toast from 'react-hot-toast';
import { FiSend, FiMessageCircle, FiMail, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSending, setIsSending] = useState(false);

  const onSubmit = (data) => {
    setIsSending(true);

    // EmailJS Configuration - Replace with your actual IDs
    const serviceID = import.meta.env.VITE_SERVICE_ID;
    const templateID = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    emailjs.send(serviceID, templateID, data, publicKey)
      .then(() => {
        toast.success("Mission Success: Message Transmitted!");
        reset();
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        toast.error("Transmission Failed. Please use WhatsApp.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="min-h-screen py-10 md:py-20 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* LEFT: INFORMATION - REAL NUMBERS */}
        <div className="space-y-8 md:space-y-12">
          <h1 className="text-5xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none">
            Establish <br /> <span className="text-brand-orange">Contact .</span>
          </h1>

          <div className="space-y-6">
            <a href="https://wa.me/255752773798" className="flex items-center gap-4 md:gap-6 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-darkGrey rounded-2xl md:rounded-3xl flex items-center justify-center text-brand-orange border border-white/5 group-hover:bg-brand-orange group-hover:text-white transition-all shrink-0">
                <FiMessageCircle size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">WhatsApp</p>
                <p className="text-lg md:text-xl font-bold">+255 752 773 798</p>
              </div>
            </a>

            <a href="mailto:onewaveafrica@gmail.com" className="flex items-center gap-4 md:gap-6 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-darkGrey rounded-2xl md:rounded-3xl flex items-center justify-center text-brand-orange border border-white/5 group-hover:bg-brand-orange group-hover:text-white transition-all shrink-0">
                <FiMail size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Email Base</p>
                <p className="text-lg md:text-xl font-bold break-all">onewaveafrica@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT: THE MODERN FORM */}
        <div className="bg-brand-darkGrey p-6 md:p-12 rounded-[2.5rem] lg:rounded-[3rem] border border-white/10 shadow-2xl w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Name / Company</label>
              <input 
                {...register("name", { required: true })} 
                className="w-full bg-brand-black p-4 md:p-5 rounded-2xl outline-none focus:border-brand-orange border border-transparent transition-all text-sm" 
                placeholder="Enter name..." 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">WhatsApp Number</label>
              <input 
                {...register("phone", { required: true })} 
                className="w-full bg-brand-black p-4 md:p-5 rounded-2xl outline-none focus:border-brand-orange border border-transparent transition-all text-sm" 
                placeholder="+255..." 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Mission Subject</label>
              <select {...register("subject")} className="w-full bg-brand-black p-4 md:p-5 rounded-2xl outline-none border border-transparent text-sm">
                <option>Walkie Talkie Inquiry</option>
                <option>POS System Inquiry</option>
                <option>Security Hardware</option>
                <option>Bulk Order Quote</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Detailed Message</label>
              <textarea 
                {...register("message", { required: true })} 
                rows="4" 
                className="w-full bg-brand-black p-4 md:p-5 rounded-2xl outline-none border border-transparent resize-none text-sm" 
                placeholder="Describe your tactical requirements..."
              ></textarea>
            </div>

            <button 
              disabled={isSending}
              className="w-full bg-brand-orange text-white py-5 md:py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 transition-all active:scale-95 group"
            >
              {isSending ? "Transmitting..." : "Send Message"} 
              <FiSend className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;