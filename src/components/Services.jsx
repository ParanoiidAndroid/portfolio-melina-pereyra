// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Video, Globe, PenTool, Mail, Phone, File, DollarSign, Languages, Search, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      id: 1,
      title: t('services.translation.title'),
      image: "/assets/traduccion.webp",
      icon: FileText,
      services: t('services.translation.services', { returnObjects: true })
    },
    {
      id: 2,
      title: t('services.audiovisual.title'),
      image: "/assets/traduccion-audiovisual.png",
      icon: Video,
      services: t('services.audiovisual.services', { returnObjects: true })
    },
    {
      id: 3,
      title: t('services.localization.title'),
      image: "/assets/localizacion.png",
      icon: Globe,
      services: t('services.localization.services', { returnObjects: true })
    },
    {
      id: 4,
      title: t('services.editing.title'),
      image: "/assets/edicion-y-correccion.png",
      icon: PenTool,
      services: t('services.editing.services', { returnObjects: true })
    }
  ];

  return (
    <section id="services" className="py-20 px-10 md:px-20 bg-gradient-to-b from-[#EFEAEF] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] bg-clip-text text-transparent leading-tight font-playfair mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg md:text-xl text-[#6A5A87] font-lora max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
                      <service.icon className="h-5 w-5 text-[#9152C9]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 font-lora">
                      {service.title}
                    </h3>
                    <ul className="space-y-2">
                      {service.services.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: (index * 0.1) + (itemIndex * 0.1) + 0.3 }}
                          viewport={{ once: true }}
                          className="flex items-center text-[#9152C9] font-medium"
                        >
                          <div className="w-2 h-2 bg-[#9152C9] rounded-full mr-3 flex-shrink-0"></div>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg md:text-xl text-[#6A5A87] font-lora mb-6">
            {t('services.customService')}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="bg-[#D0A2F3] hover:bg-[#9152C9] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300"
            >
              <Mail className="mr-2 h-4 w-4" />
              {t('services.contactButton')}
            </Button>
          </motion.div>
        </motion.div>

        {/* CATTools Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] bg-clip-text text-transparent leading-tight font-playfair mb-4">
              {t('services.catTools.title')}
            </h2>
            <p className="text-lg text-[#6A5A87] font-lora max-w-3xl mx-auto">
              {t('services.catTools.subtitle')}
            </p>
          </div>

          {/* Herramientas CAT estáticas */}
          <div className="flex justify-center items-center">
            <div className="flex flex-wrap justify-center items-center gap-12 max-w-5xl">
              {[
                { name: "Trados", image: "/assets/CATTools-trados.png" },
                { name: "MemoQ", image: "/assets/CATTools-memoQ.png" },
                { name: "Wordfast", image: "/assets/CATTools-wordfast.png" },
                { name: "Aegisub", image: "/assets/CATTools-aegisub.png" },
                { name: "CaptionHub", image: "/assets/CATTools-captionhub.png" }
              ].map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center space-y-3 group cursor-pointer"
                >
                  <div className="relative">
                    {/* Contenedor del logo con efectos */}
                    <div className="w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-[#D0A2F3]/30 p-4">
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="max-w-full max-h-full object-contain filter group-hover:brightness-110 group-hover:contrast-110 transition-all duration-300"
                      />
                    </div>
                    {/* Efecto de resplandor sutil */}
                    <div className="absolute inset-0 w-32 h-20 bg-gradient-to-r from-[#D0A2F3]/10 to-[#C08BEF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </div>
                  
                  {/* Nombre de la herramienta */}
                  <span className="text-sm font-medium text-[#6A5A87] font-lora group-hover:text-[#9152C9] transition-colors duration-300 text-center">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cómo Trabajo Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] bg-clip-text text-transparent leading-tight font-playfair mb-6">
              {t('services.howIWork.title')}
            </h2>
            <p className="text-lg text-[#6A5A87] font-lora max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: t('services.howIWork.subtitle') }} />
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: t('services.howIWork.steps.1.title'),
                description: t('services.howIWork.steps.1.description'),
                icon: Phone,
                color: "bg-[#FFB3BA]"
              },
              {
                step: 2,
                title: t('services.howIWork.steps.2.title'),
                description: t('services.howIWork.steps.2.description'),
                icon: File,
                color: "bg-[#B3D9FF]"
              },
              {
                step: 3,
                title: t('services.howIWork.steps.3.title'),
                description: t('services.howIWork.steps.3.description'),
                icon: DollarSign,
                color: "bg-[#FFD9B3]"
              },
              {
                step: 4,
                title: t('services.howIWork.steps.4.title'),
                description: t('services.howIWork.steps.4.description'),
                icon: Languages,
                color: "bg-[#B3FFB3]"
              },
              {
                step: 5,
                title: t('services.howIWork.steps.5.title'),
                description: t('services.howIWork.steps.5.description'),
                icon: Search,
                color: "bg-[#FFB3BA]"
              },
              {
                step: 6,
                title: t('services.howIWork.steps.6.title'),
                description: t('services.howIWork.steps.6.description'),
                icon: Send,
                color: "bg-[#B3D9FF]"
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 p-6">
                  <CardContent className="p-0">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {process.step}
                    </div>
                    
                    {/* Icon Circle */}
                    <div className={`w-16 h-16 ${process.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                      <process.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-[#6A5A87] mb-3 font-lora">
                        {process.title}
                      </h3>
                      <p className="text-[#6A5A87] font-lora leading-relaxed">
                        {process.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

