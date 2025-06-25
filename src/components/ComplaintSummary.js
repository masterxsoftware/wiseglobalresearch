import React from 'react';

// ✅ Certification Images
import cert1 from '../assets/images/iso.png';
import cert2 from '../assets/images/msme.png';
import cert3 from '../assets/images/nsic.png';
import cert4 from '../assets/images/qva.png';
import cert5 from '../assets/images/ssl.png';
import cert6 from '../assets/images/gaafs.png';
import cert7 from '../assets/images/Verified.png';

const ComplaintSummary = () => {
  const currentDate = new Date();
  const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
  const month = previousMonthDate.toLocaleString('default', { month: 'long' });
  const year = previousMonthDate.getFullYear();

  const certImages = [cert1, cert2, cert3, cert4, cert5, cert6, cert7];

  return (
    <section className="bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto animate-fadeIn">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 drop-shadow-xl animate-fadeUp">
          Data For The Month Ending – {month} {year}
        </h2>

        {/* Complaint Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 overflow-auto border border-white/20">
          <table className="min-w-[1000px] w-full text-sm md:text-base text-center border border-white/30 border-collapse">
            <thead className="bg-white/10 text-white font-semibold">
              <tr>
                <th className="border border-white/30 px-3 py-2">Sr. No.</th>
                <th className="border border-white/30 px-3 py-2">Received from</th>
                <th className="border border-white/30 px-3 py-2">Pending at the end of last month</th>
                <th className="border border-white/30 px-3 py-2">Received</th>
                <th className="border border-white/30 px-3 py-2">Resolved</th>
                <th className="border border-white/30 px-3 py-2">Total Pending</th>
                <th className="border border-white/30 px-3 py-2">Pending &gt; 3 Months</th>
                <th className="border border-white/30 px-3 py-2">Avg. Resolution (Days)</th>
              </tr>
            </thead>
            <tbody className="bg-white/5">
              {[['1', 'Directly from Investors'], ['2', 'SEBI (SCORES)'], ['3', 'Other Sources (if any)']].map(([no, source], i) => (
                <tr key={i}>
                  <td className="border border-white/20 px-3 py-2">{no}</td>
                  <td className="border border-white/20 px-3 py-2">{source}</td>
                  {Array(6).fill(0).map((_, idx) => (
                    <td key={idx} className="border border-white/20 px-3 py-2">0</td>
                  ))}
                </tr>
              ))}
              <tr className="font-bold">
                <td className="border border-white/20 px-3 py-2"></td>
                <td className="border border-white/20 px-3 py-2">Grand Total</td>
                {Array(6).fill(0).map((_, idx) => (
                  <td key={idx} className="border border-white/20 px-3 py-2">0</td>
                ))}
              </tr>
            </tbody>
          </table>

          <p className="mt-4 text-white text-sm leading-relaxed">
            <sup>^</sup> Average Resolution time is the total number of days taken to resolve each complaint, divided by total resolved complaints in current month.
          </p>
        </div>

        {/* ✅ Certification Section */}
        <div className="mt-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl animate-fadeUp">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-green-300 text-center animate-fadeUp">
            Certified • Compliant • Trusted
          </h3>

          {/* Logos in Dual Circle + Shine */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {certImages.map((img, idx) => (
              <div
                key={idx}
                className="shine-hover group relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white/30 shadow-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md overflow-hidden transition duration-300 transform hover:scale-110"
              >
                <div className="absolute inset-2 rounded-full border border-white/30 bg-white/5 flex items-center justify-center z-10">
                  <img
                    src={img}
                    alt={`Cert-${idx}`}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-3 text-white/90 text-sm md:text-base animate-fadeUp">
            <p>We are SEBI-registered under RA Regulations 2014.</p>
            <p>Our advisory practices follow strict compliance and quality assurance.</p>
            <p>Verified certifications enhance your trust and transparency with us.</p>
            <p>Regular audits ensure all services meet regulatory expectations.</p>
          </div>

          <p className="mt-6 text-white/70 text-xs italic text-center animate-fadeUp">
            Disclaimer: Investments in securities are subject to market risks. Please verify all details before making investment decisions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComplaintSummary;
