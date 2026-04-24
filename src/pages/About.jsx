import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Heart, Star, ArrowRight, CheckCircle, Mic, Library, Sparkles } from 'lucide-react';
import { teamMembers } from '../data/books';
import Breadcrumb from '../components/Breadcrumb';

const milestones = [
  { year: '1999', title: 'Fondarea Editurii', desc: 'Prince\'s Multimedia ia naștere cu misiunea de a promova literatura română de calitate.' },
  { year: '2004', title: 'Prima Mare Colecție', desc: 'Lansăm prima colecție de referință dedicată poeziei clasice românești — 20 de volume.' },
  { year: '2010', title: 'Extindere Națională', desc: 'Parteneri cu 200+ librării din toată România. Ajungem în fiecare colț al țării.' },
  { year: '2015', title: 'Lansare Audiobooks', desc: 'Intrăm în era digitală cu prima colecție de audiobook-uri în limba română.' },
  { year: '2019', title: '20 de Ani de Excelență', desc: 'Aniversăm două decenii cu lansarea a 500 de titluri și 10.000 de clienți fideli.' },
  { year: '2024', title: 'Platforma Online', desc: 'Lansăm noua platformă digitală pentru o experiență de cumpărare premium.' },
];

export default function About() {
  return (
    <div className="page-transition min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Despre Noi' }]} />
          <div className="max-w-3xl mt-6">
            <h1 className="text-5xl sm:text-6xl font-bold mb-5 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Povestea Noastră
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              De peste 25 de ani, Prince's Multimedia aduce în casele cititorilor români cele mai valoroase opere ale literaturii noastre naționale. O misiune, o pasiune, o moștenire.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { value: '25+', label: 'Ani Experiență' },
                { value: '500+', label: 'Titluri Publicate' },
                { value: '10K+', label: 'Clienți Fericiți' },
                { value: '50+', label: 'Autori Publicați' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-3">Misiunea Noastră</p>
              <h2 className="section-title mb-5">Custozi ai Literaturii Române</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Prince's Multimedia s-a fondat cu o misiune simplă dar profundă: de a face accesibilă marea literatură română tuturor celor care iubesc cuvântul scris. Credem că literatura este cea mai importantă moștenire culturală a unui popor.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Fiecare carte pe care o publicăm este mai mult decât un produs — este un pod între trecut și prezent, între scriitor și cititor, între tradiție și modernitate.
              </p>
              <div className="space-y-3">
                {[
                  'Selecție riguroasă a titlurilor publicate',
                  'Ediții îngrijite cu texte critice și note',
                  'Design editorial premium și hârtie de calitate',
                  'Prețuri accesibile pentru toți cititorii',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: BookOpen, title: 'Tradiție Literară', desc: 'Promovăm valorile perene ale literaturii române clasice și contemporane.', color: 'bg-purple-100 text-purple-700' },
                { icon: Sparkles, title: 'Excelență Editorială', desc: 'Fiecare volum este tratat cu maximă grijă, de la manuscris la carte finisată.', color: 'bg-blue-100 text-blue-700' },
                { icon: Heart, title: 'Pasiune Autentică', desc: 'Iubim literatura română și transmitem această iubire în fiecare pagină.', color: 'bg-rose-100 text-rose-700' },
                { icon: Users, title: 'Comunitate', desc: 'Construim o comunitate de cititori pasionați de cultura română.', color: 'bg-amber-100 text-amber-700' },
              ].map(val => (
                <div key={val.title} className="bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className={`w-11 h-11 ${val.color} rounded-xl flex items-center justify-center mb-3`}>
                    <val.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{val.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-2">Drumul Nostru</p>
            <h2 className="section-title">Istoria Editurii</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-purple-200 sm:-translate-x-0.5" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  <div className={`hidden sm:block sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10'}`}>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                      <div className="text-purple-700 font-bold text-sm mb-1">{m.year}</div>
                      <h3 className="font-bold text-gray-900 mb-1">{m.title}</h3>
                      <p className="text-sm text-gray-600">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-3.5 sm:left-1/2 sm:-translate-x-1/2 w-5 h-5 bg-purple-700 rounded-full border-4 border-white shadow-md z-10" />
                  <div className="pl-14 sm:hidden">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <div className="text-purple-700 font-bold text-sm mb-1">{m.year}</div>
                      <h3 className="font-bold text-gray-900 mb-1">{m.title}</h3>
                      <p className="text-sm text-gray-600">{m.desc}</p>
                    </div>
                  </div>
                  <div className={`hidden sm:block sm:w-1/2 ${i % 2 === 0 ? 'sm:pl-10' : 'sm:pr-10'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-2">Serviciile Noastre</p>
            <h2 className="section-title">Ce Oferim</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Library,
                title: 'Colecții Curate',
                desc: 'O selecție atentă a celor mai valoroase titluri din literatura română, îngrijite de experți recunoscuți.',
                features: ['Poezie clasică și contemporană', 'Proză și roman', 'Filozofie și eseistică', 'Critică literară'],
                gradient: 'from-purple-800 to-indigo-800',
              },
              {
                icon: Mic,
                title: 'Audiobook Premium',
                desc: 'Ascultă literatura română în interpretări de excepție, realizate de actori și recitatori de renume.',
                features: ['Înregistrări de studio profesionale', 'Actori și recitatori de renume', 'Format MP3 și streaming', 'Disponibil pe toate platformele'],
                gradient: 'from-blue-800 to-cyan-700',
              },
              {
                icon: Star,
                title: 'Expertiză Editorială',
                desc: 'Fiecare carte beneficiază de grija editorilor noștri specializați în literatura română.',
                features: ['Note critice și bibliografice', 'Prefețe și postfețe semnate', 'Redactare filologică riguroasă', 'Design tipografic premium'],
                gradient: 'from-amber-700 to-orange-700',
              },
            ].map(service => (
              <div key={service.title} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`bg-gradient-to-br ${service.gradient} p-6 text-white`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{service.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{service.desc}</p>
                </div>
                <div className="bg-white p-5">
                  <ul className="space-y-2">
                    {service.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-2">Oamenii Noștri</p>
            <h2 className="section-title">Echipa Prince's Multimedia</h2>
            <p className="section-subtitle mx-auto text-center">Oameni pasionați de literatură care lucrează cu dedicare pentru voi</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className={`h-32 bg-gradient-to-br ${member.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold text-white">
                    {member.initials}
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>{member.name}</h3>
                  <p className="text-xs text-purple-700 font-medium mb-3">{member.role}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Recunoaștere & Premii</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Award, title: 'Premiul Uniunii Editorilor', year: '2018', desc: 'Cea mai bună editură specializată în literatura română.' },
              { icon: Star, title: 'Topul Cititorilor', year: '2021', desc: 'Votată editura preferată de cititorii din România.' },
              { icon: BookOpen, title: 'Excelență Editorială', year: '2023', desc: 'Premiu național pentru calitate și diversitate editorială.' },
            ].map(award => (
              <div key={award.title} className="flex items-start gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <award.icon className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs text-amber-600 font-semibold mb-0.5">{award.year}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{award.title}</h3>
                  <p className="text-xs text-gray-600">{award.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              De ce să Alegi Prince's Multimedia?
            </h2>
            <p className="text-blue-200">5 motive pentru care cititorii ne aleg de ani de zile</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {[
              { num: '01', title: 'Selecție Premium', desc: 'Curatăm cu grijă fiecare titlu publicat' },
              { num: '02', title: 'Ediții de Calitate', desc: 'Hârtie și producție tipografică superioară' },
              { num: '03', title: 'Prețuri Accesibile', desc: 'Carte de calitate la prețuri corecte' },
              { num: '04', title: 'Livrare Rapidă', desc: 'Comenzi procesate în 24 de ore' },
              { num: '05', title: 'Suport Dedicat', desc: 'Echipă disponibilă pentru orice întrebare' },
            ].map(item => (
              <div key={item.num} className="bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-colors text-center">
                <div className="text-4xl font-bold text-purple-300 mb-3">{item.num}</div>
                <h3 className="font-bold text-white mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-blue-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-4">Gata să Descoperi Biblioteca Noastră?</h2>
          <p className="text-gray-600 mb-8">
            Explorează colecția completă a cărților noastre și găsește titlul perfect pentru tine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/collections" className="btn-primary flex items-center gap-2">
              Explorează Colecțiile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-secondary flex items-center gap-2">
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
