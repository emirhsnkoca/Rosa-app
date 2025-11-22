import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 3rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(15, 15, 19, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/rosa-logo.png" 
            alt="Rosa Logo" 
            style={{ height: '50px', width: 'auto' }} 
          />
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            background: 'var(--gradient-gold)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Rosa
          </span>
        </div>
        
        <Link to="/app">
          <button className="primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
            Launch App
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 2rem',
        background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 5rem)', 
          marginBottom: '1.5rem',
          lineHeight: '1.1',
          maxWidth: '900px'
        }}>
          The Future of <br />
          <span style={{ 
            background: 'var(--gradient-gold)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(212, 175, 55, 0.3)'
          }}>
            Decentralized Lottery
          </span>
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-secondary)', 
          maxWidth: '600px', 
          marginBottom: '3rem',
          lineHeight: '1.6'
        }}>
          Experience fair, transparent, and instant lottery games on the blockchain. 
          Join tables, compete with others, and win big in real-time.
        </p>

        <Link to="/app">
          <button className="primary" style={{ 
            padding: '1.2rem 3.5rem', 
            fontSize: '1.2rem',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)'
          }}>
            Start Playing Now
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          marginBottom: '4rem',
          color: 'var(--text-primary)' 
        }}>
          Why Choose Rosa?
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          <FeatureCard 
            icon="🔒"
            title="Secure & Transparent"
            description="Built on blockchain technology ensuring every draw is provably fair and verifiable."
          />
          <FeatureCard 
            icon="⚡"
            title="Instant Payouts"
            description="Winners receive their prizes automatically and instantly directly to their wallets."
          />
          <FeatureCard 
            icon="💎"
            title="Premium Experience"
            description="A luxurious, user-friendly interface designed for the modern player."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div style={{
      padding: '2.5rem',
      background: 'linear-gradient(145deg, #1a1a20 0%, #15151a 100%)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--gold-primary)' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{description}</p>
    </div>
  );
}
