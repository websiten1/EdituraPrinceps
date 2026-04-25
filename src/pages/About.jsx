import { Link } from 'react-router-dom';
import { teamMembers } from '../data/books';
import Breadcrumb from '../components/Breadcrumb';

const milestones = [
  { year: '1999', title: 'Fondată în Iași',            desc: 'Editura Princeps Multimedia este înființată cu o misiune singulară: publicarea și păstrarea celor mai valoroase opere ale patrimoniului literar român.' },
  { year: '2004', title: 'Prima Colecție Majoră',      desc: 'Prima noastră colecție de 20 de volume dedicate poeziei române clasice este primită cu entuziasm de critica literară.' },
  { year: '2010', title: 'Distribuție Națională',      desc: 'Acorduri de parteneriat cu peste 200 de librării din România ne permit să ajungem la cititori din toate regiunile țării.' },
  { year: '2015', title: 'Programul Audiobook',        desc: 'Lansăm colecția premium de audiobook-uri, aducând literatura română la o nouă generație de ascultători.' },
  { year: '2019', title: '500 de Titluri Publicate',   desc: 'Un moment aniversar: cinci sute de titluri publicate din poezie, proză, filozofie și critică literară.' },
  { year: '2024', title: 'Prezență Digitală',          desc: 'Deschidem catalogul nostru online, punând întreaga colecție la dispoziția cititorilor din România și diaspora.' },
];

const values = [
  {
    name: 'Integritate Științifică',
    desc: 'Fiecare titlu publicat este pregătit cu rigurozitate filologică. Echipa noastră editorială colaborează îndeaproape cu academicieni și specialiști pentru a asigura acuratețea și completitudinea edițiilor.',
  },
  {
    name: 'Custodiat Cultural',
    desc: 'Ne considerăm custozi ai patrimoniului literar român — responsabili pentru transmiterea fidelă a acestor opere cititorilor din prezent și viitor.',
  },
  {
    name: 'Accesibilitate',
    desc: 'Credem că marea literatură trebuie să fie accesibilă tuturor. Prețurile noastre reflectă angajamentul față de ediții de calitate la prețuri rezonabile.',
  },
  {
    name: 'Măiestrie și Calitate',
    desc: 'De la selecție până la volumul final legat, fiecare detaliu contează. Hârtie fină, tipografie îngrijită și legătură durabilă sunt standardul nostru, nu excepția.',
  },
];

export default function About() {
  return (
    <div className="fade-in min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Breadcrumb items={[{ label: 'Despre Noi' }]} />
          <div className="max-w-2xl mt-6">
            <p className="text-xs font-ui font-semibold text-burgundy uppercase tracking-widest mb-4">
              Fondată în 1999
            </p>
            <h1 className="font-display text-h1 text-charcoal leading-tight mb-4">
              Despre Editura Princeps Multimedia
            </h1>
            <div className="h-0.5 bg-burgundy w-12 mb-5" />
            <p className="font-quote-italic text-xl text-charcoal-light leading-reading">
              „O editură dedicată păstrării și celebrării patrimoniului literar român,
              pentru cititorii care înțeleg că literatura este memoria unui popor."
            </p>
          </div>
        </div>
      </section>

      {/* Povestea Noastră */}
      <section className="section bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-ui font-semibold text-burgundy uppercase tracking-widest mb-3">
                Din 1999
              </p>
              <h2 className="font-display text-h2 text-charcoal mb-4">Povestea Noastră</h2>
              <div className="h-0.5 bg-burgundy w-12 mb-6" />
              <div className="space-y-4 font-sans text-sm text-charcoal leading-reading">
                <p>
                  Editura Princeps Multimedia a fost fondată în Iași în 1999 de un grup de cercetători
                  și iubitori de literatură care împărtășeau o convingere comună: că marile opere
                  ale literaturii române merită ediții demne de importanța lor.
                </p>
                <p>
                  De la începuturi modeste — câteva titluri, o echipă mică, o pasiune profundă
                  pentru cuvântul scris — am crescut până a deveni una dintre cele mai respectate
                  edituri literare din România, cu peste 500 de titluri în catalog.
                </p>
                <p>
                  Edițiile noastre sunt pregătite cu rigurozitate științifică, tipărite pe hârtie
                  de calitate și legate pentru a dura. Publicăm autori clasici alături de voci
                  contemporane, întotdeauna cu același angajament față de calitate și autenticitate.
                </p>
              </div>
            </div>

            {/* Cronologie */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-burgundy-200" />
              <div className="space-y-6 pl-12">
                {milestones.map(m => (
                  <div key={m.year} className="relative">
                    <div className="absolute -left-12 top-1 w-4 h-4 bg-burgundy-50 border-2 border-burgundy
                                    flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-burgundy" />
                    </div>
                    <span className="text-xs font-ui font-semibold text-burgundy uppercase tracking-widest">
                      {m.year}
                    </span>
                    <h4 className="font-serif text-base text-charcoal mt-0.5 mb-1">{m.title}</h4>
                    <p className="text-xs font-sans text-charcoal-light leading-reading">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misiunea */}
      <section className="section bg-charcoal border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-ui font-semibold text-burgundy-400 uppercase tracking-widest mb-4">
            Scopul Nostru
          </p>
          <h2 className="font-display text-h2 text-white mb-5">Declarația Misiunii</h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-gray-600 w-16" />
            <span className="text-burgundy-400 text-base">❧</span>
            <div className="h-px bg-gray-600 w-16" />
          </div>
          <p className="font-quote-italic text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            „Să punem comorile literaturii române la îndemâna fiecărui cititor care le caută —
            în ediții care onorează autorii, respectă cititorul și rezistă în timp."
          </p>
        </div>
      </section>

      {/* Valorile */}
      <section className="section bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-ui font-semibold text-burgundy uppercase tracking-widest mb-3">Ce Ne Definește</p>
            <h2 className="font-display text-h2 text-charcoal mb-3">Valorile Noastre</h2>
            <div className="h-0.5 bg-burgundy w-12 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map(v => (
              <div key={v.name}
                   className="bg-white border border-gray-200 border-l-4 border-l-burgundy p-6
                              hover:shadow-classic-md transition-shadow duration-300">
                <h3 className="font-serif text-h4 text-charcoal mb-2">{v.name}</h3>
                <div className="h-px bg-gray-100 w-10 mb-3" />
                <p className="text-sm font-sans text-charcoal-light leading-reading">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce Oferim */}
      <section className="section bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-ui font-semibold text-burgundy uppercase tracking-widest mb-3">Servicii</p>
            <h2 className="font-display text-h2 text-charcoal mb-3">Ce Oferim</h2>
            <div className="h-0.5 bg-burgundy w-12 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: 'I.',
                title: 'Colecții Selectate',
                desc: 'Titluri atent alese din toate genurile tradiției literare române — de la cronicile medievale la versul contemporan. Fiecare colecție este alcătuită cu îndrumare academică.',
              },
              {
                num: 'II.',
                title: 'Audiobook-uri Premium',
                desc: 'Înregistrări audio profesionale ale operelor literare, interpretate de distinși actori români. Fidele textului, produse la cele mai înalte standarde tehnice.',
              },
              {
                num: 'III.',
                title: 'Selecție Expert',
                desc: 'Consiliul nostru editorial include profesori universitari, critici literari și filologi care garantează că fiecare ediție îndeplinește standardele publicisticii academice serioase.',
              },
            ].map(item => (
              <div key={item.title} className="bg-white border border-gray-200 p-7 relative overflow-hidden
                                               hover:shadow-classic-md transition-shadow duration-300">
                <span className="absolute top-5 right-5 font-display text-5xl text-gray-100 leading-none select-none">
                  {item.num}
                </span>
                <span className="font-display text-3xl text-burgundy-200 block mb-4">{item.num}</span>
                <h3 className="font-serif text-h4 text-charcoal mb-2">{item.title}</h3>
                <div className="h-px bg-gray-100 w-8 mb-3" />
                <p className="text-sm font-sans text-charcoal-light leading-reading">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Echipa */}
      <section className="section bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-ui font-semibold text-burgundy uppercase tracking-widest mb-3">Oamenii Noștri</p>
            <h2 className="font-display text-h2 text-charcoal mb-3">Cunoaște Echipa Noastră</h2>
            <div className="h-0.5 bg-burgundy w-12 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map(member => (
              <div key={member.id}
                   className="bg-white border border-gray-200 p-6 hover:shadow-classic-md transition-shadow duration-300">
                <div className="w-14 h-14 flex items-center justify-center
                                text-white font-ui font-bold text-lg mb-4"
                     style={{ backgroundColor: member.coverColor }}>
                  {member.initials}
                </div>
                <h3 className="font-serif text-base text-charcoal">{member.name}</h3>
                <p className="text-xs font-ui text-burgundy uppercase tracking-wide mt-0.5 mb-3">{member.role}</p>
                <div className="h-px bg-gray-100 mb-3" />
                <p className="text-xs font-sans text-charcoal-light leading-reading">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* De Ce Noi */}
      <section className="section bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-ui font-semibold text-burgundy uppercase tracking-widest mb-3">Distincția Noastră</p>
            <h2 className="font-display text-h2 text-charcoal mb-3">De Ce Ne Aleg Cititorii</h2>
            <div className="h-0.5 bg-burgundy w-12 mx-auto" />
          </div>
          <ol className="space-y-0">
            {[
              { n: '1', title: 'Selecție Profesionistă',        desc: 'Fiecare titlu ales cu grijă de cercetători literari calificați.' },
              { n: '2', title: 'Literatură Română Autentică',    desc: 'Fidele textelor originale, cu aparat critic autorizat.' },
              { n: '3', title: 'Traduceri de Calitate',          desc: 'Când traducem, apelăm la traducători literari consacrați.' },
              { n: '4', title: 'Producție Premium',              desc: 'Hârtie arhivistică, legătură durabilă, tipografie îngrijită în fiecare volum.' },
              { n: '5', title: 'O Moștenire de Încredere',       desc: 'Douăzeci și cinci de ani de excelență editorială, construiți pe încredere și integritate.' },
            ].map((item, i, arr) => (
              <li key={item.n} className={`flex items-start gap-6 py-5 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className="font-display text-3xl text-burgundy-200 w-8 flex-shrink-0 leading-none pt-1">{item.n}</span>
                <div>
                  <h4 className="font-serif text-h4 text-charcoal">{item.title}</h4>
                  <p className="text-sm font-sans text-charcoal-light mt-1 leading-reading">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-h2 text-charcoal mb-4">Începe să Explorezi</h2>
          <div className="h-0.5 bg-burgundy w-12 mx-auto mb-6" />
          <p className="font-sans text-sm text-charcoal-light leading-reading mb-8">
            Răsfoiește catalogul nostru complet și descoperă operele care au modelat
            gândirea și cultura literară română de-a lungul secolelor.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/collections" className="btn-primary px-8">
              Explorează Colecția
            </Link>
            <Link to="/contact" className="btn-secondary px-8">
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
