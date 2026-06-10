import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from '../ui/SmoothScroll';
import AnimatedOutlet from '../ui/AnimatedOutlet';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <SmoothScroll />
      <Navbar />
      <main className="flex-1">
        <AnimatedOutlet />
      </main>
      <Footer />
    </div>
  );
}
