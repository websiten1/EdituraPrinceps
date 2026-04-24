import { Link } from 'react-router-dom';
import { teamMembers } from '../data/books';
import Breadcrumb from '../components/Breadcrumb';

function GoldRule({ symbol = '◆' }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gold/40" />
      <span className="text-gold text-xs">{symbol}</span>
      <div className="flex-1 h-px bg-gold/40" />
    </div>
  );
}

const milestones = [
  { year: '1999', title: 'Founded in Iași',       desc: 'Prince\'s Multimedia is established with a singular mission: to publish and preserve the finest works of Romanian literary heritage.' },
  { year: '2004', title: 'First Major Collection', desc: 'Our first collection of 20 volumes dedicated to classical Romanian poetry is received with critical acclaim.' },
  { year: '2010', title: 'National Distribution',  desc: 'Partnership agreements with over 200 bookshops across Romania allow us to reach readers in every region.' },
  { year: '2015', title: 'Audiobook Programme',    desc: 'We launch our premium audiobook collection, bringing Romanian literature to a new generation of listeners.' },
  { year: '2019', title: '500 Titles Published',   desc: 'A milestone anniversary: five hundred titles published across poetry, prose, philosophy, and literary criticism.' },
  { year: '2024', title: 'Digital Presence',       desc: 'We open our online catalogue, making our complete collection available to readers throughout Romania and the diaspora.' },
];

const values = [
  {
    name: 'Scholarly Integrity',
    desc: 'Every title we publish is prepared with rigorous philological care. Our editorial team works closely with academics and specialists to ensure accuracy and completeness.',
  },
  {
    name: 'Cultural Stewardship',
    desc: 'We consider ourselves custodians of Romanian literary heritage — responsible for transmitting these works faithfully to present and future readers.',
  },
  {
    name: 'Accessibility',
    desc: 'We believe that great literature should be available to all. Our pricing reflects our commitment to making quality editions accessible without compromise.',
  },
  {
    name: 'Craft & Quality',
    desc: 'From selection to final bound copy, every detail is considered. Fine paper, careful typography, and durable bindings are our standard, not our exception.',
  },
];

export default function About() {
  return (
    <div className="fade-in min-h-screen bg-cream">

      {/* ── Hero ── */}
      <section className="bg-cream-dark border-b border-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Breadcrumb items={[{ label: 'About' }]} />
          <div className="max-w-2xl mt-6">
            <p className="text-xs font-sans font-bold text-gold uppercase tracking-widest mb-4">
              Established 1999
            </p>
            <h1 className="font-serif text-h1 text-charcoal leading-tight mb-4">
              About Prince's Multimedia
            </h1>
            <GoldRule />
            <p className="font-serif-italic text-xl text-charcoal-light leading-reading mt-4">
              "A house dedicated to the preservation and celebration of Romanian literary
              heritage, for readers who understand that literature is the memory of a people."
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="section bg-cream border-b border-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-sans font-bold text-gold uppercase tracking-widest mb-3">
                Since 1999
              </p>
              <h2 className="font-serif text-h2 text-charcoal mb-4">Our Story</h2>
              <GoldRule />
              <div className="space-y-4 mt-5 font-sans text-sm text-charcoal leading-reading">
                <p>
                  Prince's Multimedia was founded in Iași in 1999 by a group of scholars and
                  literature enthusiasts who shared a common conviction: that the great works of
                  Romanian literature deserved editions worthy of their significance.
                </p>
                <p>
                  From modest beginnings — a handful of titles, a small team, a deep passion
                  for the written word — we have grown into one of Romania's most respected
                  literary publishers, with over 500 titles in our catalogue.
                </p>
                <p>
                  Our editions are prepared with scholarly care, printed on quality paper, and
                  bound to last. We publish classical authors alongside contemporary voices,
                  always with the same commitment to quality and authenticity.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gold/30" />
              <div className="space-y-6 pl-12">
                {milestones.map(m => (
                  <div key={m.year} className="relative">
                    <div className="absolute -left-12 top-1 w-4 h-4 bg-gold/20 border border-gold
                                    flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-gold" />
                    </div>
                    <span className="text-xs font-sans font-bold text-gold uppercase tracking-widest">
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

      {/* ── Mission ── */}
      <section className="section bg-forest-800 border-b border-forest-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-sans font-bold text-gold uppercase tracking-widest mb-4">
            Our Purpose
          </p>
          <h2 className="font-serif text-h2 text-cream mb-5">Mission Statement</h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-gold/40 w-16" />
            <span className="text-gold text-base">❧</span>
            <div className="h-px bg-gold/40 w-16" />
          </div>
          <p className="font-serif-italic text-2xl text-cream/90 leading-relaxed max-w-2xl mx-auto">
            "To make the treasures of Romanian literature available to every reader who seeks
            them — in editions that honour the authors, respect the reader, and endure with time."
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section bg-cream border-b border-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-sans font-bold text-gold uppercase tracking-widest mb-3">What We Stand For</p>
            <h2 className="font-serif text-h2 text-charcoal">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map(v => (
              <div key={v.name}
                   className="bg-cream border border-paper border-l-4 border-l-forest-800 p-6
                              hover:shadow-classic transition-shadow duration-300">
                <h3 className="font-serif text-h4 text-charcoal mb-2">{v.name}</h3>
                <div className="h-px bg-gold/40 w-10 mb-3" />
                <p className="text-sm font-sans text-charcoal-light leading-reading">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className="section bg-cream-dark border-b border-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-sans font-bold text-gold uppercase tracking-widest mb-3">Services</p>
            <h2 className="font-serif text-h2 text-charcoal">What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: 'I.',
                title: 'Curated Collections',
                desc: 'Carefully selected titles spanning every genre of Romanian literary tradition — from medieval chronicles to contemporary verse. Each collection is assembled with scholarly guidance.',
              },
              {
                num: 'II.',
                title: 'Premium Audiobooks',
                desc: 'Professional studio recordings of literary works, performed by distinguished Romanian actors. Faithful to the text, produced to the highest technical standards.',
              },
              {
                num: 'III.',
                title: 'Expert Curation',
                desc: 'Our editorial board includes university professors, literary critics, and philologists who ensure every edition meets the standards of serious scholarly publishing.',
              },
            ].map(item => (
              <div key={item.title} className="bg-cream border border-paper p-7 relative overflow-hidden">
                <span className="absolute top-5 right-5 font-serif text-5xl text-gold/10 leading-none select-none">
                  {item.num}
                </span>
                <span className="font-serif text-3xl text-gold/60 block mb-4">{item.num}</span>
                <h3 className="font-serif text-h4 text-charcoal mb-2">{item.title}</h3>
                <div className="h-px bg-gold/40 w-8 mb-3" />
                <p className="text-sm font-sans text-charcoal-light leading-reading">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section bg-cream border-b border-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-sans font-bold text-gold uppercase tracking-widest mb-3">The People</p>
            <h2 className="font-serif text-h2 text-charcoal">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map(member => (
              <div key={member.id}
                   className="bg-cream border border-paper p-6 hover:shadow-classic transition-shadow">
                <div className="w-14 h-14 bg-forest-800 flex items-center justify-center
                                text-cream font-serif text-2xl mb-4">
                  {member.initials}
                </div>
                <h3 className="font-serif text-base text-charcoal">{member.name}</h3>
                <p className="text-xs font-sans text-gold uppercase tracking-widest mt-0.5 mb-3">{member.role}</p>
                <div className="h-px bg-paper mb-3" />
                <p className="text-xs font-sans text-charcoal-light leading-reading">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="section bg-cream-dark border-b border-paper">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-sans font-bold text-gold uppercase tracking-widest mb-3">Our Distinctiveness</p>
            <h2 className="font-serif text-h2 text-charcoal">Why Readers Choose Us</h2>
          </div>
          <ol className="space-y-0">
            {[
              { n: '1', title: 'Professional Curation',          desc: 'Every title selected with care by qualified literary scholars.' },
              { n: '2', title: 'Authentic Romanian Literature',  desc: 'Faithful to the original texts, with authoritative critical apparatus.' },
              { n: '3', title: 'Quality Translations',           desc: 'When we translate, we commission established literary translators.' },
              { n: '4', title: 'Premium Production Values',      desc: 'Archival paper, durable bindings, thoughtful typography in every volume.' },
              { n: '5', title: 'A Trusted Heritage',             desc: 'Twenty-five years of publishing excellence, built on trust and integrity.' },
            ].map((item, i, arr) => (
              <li key={item.n} className={`flex items-start gap-6 py-5 ${i < arr.length - 1 ? 'border-b border-paper' : ''}`}>
                <span className="font-serif text-3xl text-gold/40 w-8 flex-shrink-0 leading-none pt-1">{item.n}</span>
                <div>
                  <h4 className="font-serif text-h4 text-charcoal">{item.title}</h4>
                  <p className="text-sm font-sans text-charcoal-light mt-1 leading-reading">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-cream py-16 border-t border-paper">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-h2 text-charcoal mb-4">Begin Exploring</h2>
          <GoldRule />
          <p className="font-sans text-sm text-charcoal-light leading-reading mb-8 mt-5">
            Browse our complete catalogue and discover the works that have shaped Romanian
            literary thought and culture across the centuries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/collections" className="btn-primary px-8">
              Explore the Collection
            </Link>
            <Link to="/contact" className="btn-secondary px-8">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
