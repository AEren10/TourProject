import React from "react";
import TourCard from "./TourCard"; // TourCard bileşenini içe aktarın

// Fonksiyon, belirli bir sayıda Tour Card bileşeni oluşturur
const renderTourCards = (numberOfCards) => {
  // Belirli bir sayıda Tour Card bileşeni oluşturmak için döngü kullanın
  const tourCards = [];
  for (let i = 1; i <= numberOfCards; i++) {
    tourCards.push(
      <TourCard
        key={i}
        imageUrl={`url${i}`} // Örnek olarak, her bir Tour Card için farklı bir URL oluşturuyoruz
        text={`Tur ${i}`} // Her bir Tour Card için farklı bir başlık
        number={i} // Her bir Tour Card'ın durak sayısı olarak sıra numarasını kullanıyoruz
        totalStops={totalStops} // Toplam durak sayısını Tur Card bileşenine iletiyoruz
        targetScreen="HedefEkran"
        params={{ tourId: i }} // Her bir Tour Card için farklı bir tur kimliği (tourId) atıyoruz
      />
    );
  }
  return tourCards;
};

export default renderTourCards;
