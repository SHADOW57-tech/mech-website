// 📁 components/MapComponent.jsx

export default function MapComponent() {
  return (
    <div className="rounded overflow-hidden border shadow-md max-w-4xl mx-auto">
      <iframe
        title="ICS AutoFix Location"
        width="100%"
        height="400"
        loading="lazy"
        allowFullScreen
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.5918093726193!2d3.379205015958929!3d6.52437972370913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d2c3983a8d9%3A0x9cb15d86d7e7fc48!2sICS%20AutoFix!5e0!3m2!1sen!2sng!4v1720000000000"
      />
    </div>
  );
}
