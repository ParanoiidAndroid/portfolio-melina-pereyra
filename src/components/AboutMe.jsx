// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Globe, Award, Heart } from 'lucide-react';

const AboutMe = () => {
  return (
    <section id="about" className="relative bg-white px-10 md:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Título de la sección */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] bg-clip-text text-transparent font-playfair mb-4">
            Sobre Mí
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagen y contenido principal */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Foto placeholder */}
            <div className="relative">
              <div className="w-80 h-96 mx-auto bg-gradient-to-br from-[#D0A2F3]/20 to-[#C08BEF]/20 rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-6xl text-[#9152C9]">👩‍💼</div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#D0A2F3] rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#9152C9]">5+</div>
                <div className="text-sm text-[#6A5A87]">Años</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#9152C9]">100+</div>
                <div className="text-sm text-[#6A5A87]">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#9152C9]">15+</div>
                <div className="text-sm text-[#6A5A87]">Países</div>
              </div>
            </div>
          </motion.div>

          {/* Biografía */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#6A5A87] font-lora">
                Mi Historia
              </h3>
              <p className="text-base text-[#6A5A87] leading-relaxed font-lora">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-base text-[#6A5A87] leading-relaxed font-lora">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Pasiones y especialidades */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-[#6A5A87] font-lora">
                Mis Pasiones
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-[#EFEAEF]/50 border-[#D0A2F3]/20 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-5 h-5 text-[#9152C9]" />
                      <span className="text-sm font-medium text-[#6A5A87]">Literatura</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#EFEAEF]/50 border-[#D0A2F3]/20 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-[#9152C9]" />
                      <span className="text-sm font-medium text-[#6A5A87]">Culturas</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#EFEAEF]/50 border-[#D0A2F3]/20 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-[#9152C9]" />
                      <span className="text-sm font-medium text-[#6A5A87]">Precisión</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#EFEAEF]/50 border-[#D0A2F3]/20 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-[#9152C9]" />
                      <span className="text-sm font-medium text-[#6A5A87]">Comunicación</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
