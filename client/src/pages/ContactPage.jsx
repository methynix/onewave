import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';
import { FiSend, FiMessageCircle, FiMail, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
  const { register, handleSubmit, reset } = useForm();

  // THE EMAIL TRANSMISSION LOGIC
  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post('/contact', data);
    },
    onSuccess: () => {
      toast.success("Message Transmitted! We will contact you shortly.");
      reset();
    },
    onError: () => {
      toast.error("Transmission failed. Please use WhatsApp.");
    }
  });

  return (
    <div className="min-h-screen py-20 px-4 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20">
        
        {/* LEFT: INFORMATION */}
        <div className="space-y-10">
          <h1 className="text-7xl font-display font-black uppercase italic tracking-tighter">
            Establish <br /> <span className="text-brand-orange">Contact .</span>
          </h1>

          <div className="space-y-6">
            {/* REAL WHATSAPP */}
            <a href="https://wa.me/255752773798" className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-brand-darkGrey rounded-3xl flex items-center justify-center text-brand-orange border border-white/5 group-hover:bg-brand-orange group-hover:text-white transition-all">
                <FiMessageCircle size={30} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">WhatsApp Line</p>
                <p className="text-xl font-bold">+255 752 773 798</p>
              </div>
            </a>

            {/* REAL EMAIL */}
            <a href="mailto:onewaveafrica@gmail.com" className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-brand-darkGrey rounded-3xl flex items-center justify-center text-brand-orange border border-white/5 group-hover:bg-brand-orange group-hover:text-white transition-all">
                <FiMail size={30} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Email Base</p>
                <p className="text-xl font-bold">onewaveafrica@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT: THE FORM */}
        <div className="bg-brand-darkGrey p-10 rounded-[3rem] border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit((data) => sendMessage(data))} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Name / Company</label>
              <input {...register("name")} className="w-full bg-brand-black p-5 rounded-2xl outline-none focus:border-brand-orange border border-transparent" placeholder="Enter name..." required />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">WhatsApp Number</label>
              <input {...register("phone")} className="w-full bg-brand-black p-5 rounded-2xl outline-none focus:border-brand-orange border border-transparent" placeholder="+255..." required />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Subject</label>
              <select {...register("subject")} className="w-full bg-brand-black p-5 rounded-2xl outline-none border border-transparent">
                <option>Walkie Talkie Inquiry</option>
                <option>POS System Inquiry</option>
                <option>Security Gear</option>
                <option>Bulk Order Quote</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Message</label>
              <textarea {...register("message")} rows="4" className="w-full bg-brand-black p-5 rounded-2xl outline-none border border-transparent resize-none" placeholder="Describe your requirements..."></textarea>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-brand-orange text-white py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? "Transmitting..." : "Send Message"} <FiSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;