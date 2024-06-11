import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const carouselItemWidth = width;

const tours = [
  {
    name: "Bodrum",
    tourHeader: "Mavi Yolculuk: Bodrum'un Sıcak Esintisi",
    tourImage:
      "https://fabaylife.com/wp-content/uploads/2023/06/blog_bodrumun_dogal_guzellikleri.jpg",
    places: [
      {
        lat: 37.0378874,
        lon: 27.4241164,
        name: "Halikarnas Mozolesi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJlwmXEkdsvhQR0fktlJphpF4",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.2,
      },
      {
        lat: 37.0317978,
        lon: 27.4291652,
        name: "Bodrum Kalesi ve Sualtı Arkeoloji Müzesi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJYw5gNEJsvhQRcRzUhvXx1Cs",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 37.0324443,
        lon: 27.4286396,
        name: "Bodrum Sualtı Arkeoloji Müzesi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJqdSVl0FsvhQRRE021bxW1MU",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.4,
      },
      {
        lat: 37.0399767,
        lon: 27.4216112,
        name: "Bodrum Antik Tiyatrosu",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJv9W_9UdsvhQR2r-WmkBy9K4",
        place_types: ["point_of_interest", "establishment"],
        rating: 4.5,
      },
      {
        lat: 37.0377363,
        lon: 27.4133796,
        name: "Myndos Kapısı",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJa74LinVtvhQRBjZuPM4x-bw",
        place_types: ["point_of_interest", "establishment"],
        rating: 4.2,
      },
      {
        lat: 37.0347481,
        lon: 27.4317874,
        name: "Bodrum Deniz Müzesi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJ_1Ko1EFsvhQR3P9pZBJXqZ4",
        place_types: [
          "museum",
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 37.0302367,
        lon: 27.4397033,
        name: "Zeki Müren Sanat Müzesi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJBQsjnm5svhQRJz_yDJJmtw0",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 37.0337114,
        lon: 27.4150291,
        name: "Historic Bodrum House",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJlxX9qfBtvhQReydYA3l6Rgo",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 0,
      },
      {
        lat: 37.0356715,
        lon: 27.4321388,
        name: "Herodotus Statue",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJkYEbbzdtvhQRDFPDRvgjpZ8",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 3.8,
      },
      {
        lat: 37.0312011,
        lon: 27.4384046,
        name: "View point to watch the castle at sunset",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ33DUR_xtvhQRVl1p8RWQ0RQ",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.4,
      },
      {
        lat: 37.0323167,
        lon: 27.4247795,
        name: "Deniz Feneri",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ-9t-QkRsvhQRsSeEGLwms-4",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.9,
      },
      {
        lat: 37.0336998,
        lon: 27.413158,
        name: "Halicarnassus ancient city walls",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ60GDYQxtvhQRSme8RGkjwUk",
        place_types: ["point_of_interest", "establishment"],
        rating: 4.5,
      },
      {
        lat: 37.032921,
        lon: 27.429682,
        name: "Kızılhisarlı Mustafa Paşa Camii",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJzda0gEFsvhQRBujuF58xZJY",
        place_types: [
          "place_of_worship",
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 37.0317757,
        lon: 27.4292118,
        name: "Karia Princess Museum",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJ3xrHykNsvhQRe4JG9zohK_8",
        place_types: [
          "museum",
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 37.028707,
        lon: 27.3900499,
        name: "Kümbet",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJnZ_Zu6BtvhQRHD-iGIQ5GeQ",
        place_types: ["point_of_interest", "establishment"],
        rating: 4.5,
      },
      {
        lat: 37.0663869,
        lon: 27.4188887,
        name: "Pedasa Antik Kenti",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJKSkfloRuvhQRo7OVs9aIrj8",
        place_types: ["point_of_interest", "establishment"],
        rating: 4.3,
      },
      {
        lat: 37.0401002,
        lon: 27.4266054,
        name: "Temple of Area (Mars)",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJa3BrvENtvhQR0m2lWTTKqtg",
        place_types: ["point_of_interest", "establishment"],
        rating: 1.8,
      },
      {
        lat: 37.0355643,
        lon: 27.4285926,
        name: "Gulet Bodrum Queen",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJDS2LYhptvhQRLrjXycdhZ8A",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 5,
      },
      {
        lat: 37.0085261,
        lon: 27.4574104,
        name: "BODRUM",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJWeWTHpdrvhQRHCjzWO75H-Q",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4,
      },
      {
        lat: 37.0321903,
        lon: 27.4285815,
        name: "Bodrum kalesi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJN2AI8zhtvhQRfO3RUOAfwqE",
        place_types: ["point_of_interest", "establishment"],
        rating: 4.7,
      },
    ],
  },
  {
    name: "Berlin",
    tourHeader: "Gece Hayatının Merkezi: Berlin'de Keşif",
    tourImage:
      "https://www.interbustur.com/wp-content/uploads/2017/07/berlin-gezi-rehberi.jpg",
    places: [
      {
        lat: 52.5162746,
        lon: 13.3777041,
        name: "Brandenburg Kapısı",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJiQnyVcZRqEcRY0xnhE77uyY",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 52.520815,
        lon: 13.4094191,
        name: "Berliner Fernsehturm",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ6_8UkB9OqEcRoeRJQ0j8-sg",
        place_types: [
          "tourist_attraction",
          "bar",
          "restaurant",
          "food",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.4,
      },
      {
        lat: 52.5190608,
        lon: 13.401078,
        name: "Berlin Katedrali",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
        place_id: "ChIJS9HC895RqEcR_IovsNVoDng",
        place_types: [
          "tourist_attraction",
          "church",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 52.52198139999999,
        lon: 13.413306,
        name: "Alexanderplatz",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJbygR2x5OqEcRbhbkZsMB_DA",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.3,
      },
      {
        lat: 52.5209319,
        lon: 13.2956165,
        name: "Charlottenburg Sarayı",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ85FCdSVRqEcRGv55KkmuuIs",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 52.5092312,
        lon: 13.3761053,
        name: "Potsdamer Platz",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJIeqReMlRqEcRquFNJTyYoUw",
        place_types: [
          "landmark",
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.4,
      },
      {
        lat: 52.5145229,
        lon: 13.3501085,
        name: "Berlin Zafer Sütunu",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/monument_pinlet",
        place_id: "ChIJw_HTKK9RqEcRyeWAo9t_YlU",
        place_types: [
          "landmark",
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 52.5186202,
        lon: 13.3761872,
        name: "Reichstag",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/civic-bldg_pinlet",
        place_id: "ChIJbVDuQcdRqEcR5X3xq9NSG2Q",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 52.50502239999999,
        lon: 13.4396952,
        name: "East Side Gallery",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJS6_t9aZHqEcRGCiRSnvpm94",
        place_types: [
          "landmark",
          "art_gallery",
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 52.53505209999999,
        lon: 13.3901898,
        name: "Berlin Wall Memorial",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/tree_pinlet",
        place_id: "ChIJZ0KxF_JRqEcRrLHB-4r-U-o",
        place_types: [
          "tourist_attraction",
          "park",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 52.5174032,
        lon: 13.4070297,
        name: "Nikolaiviertel",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ-ZLUyQRPqEcRROL55NvWHJ8",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 52.5211743,
        lon: 13.413297,
        name: "World Time Clock",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJmbztRB9OqEcRGBgdJ67pifE",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.4,
      },
      {
        lat: 52.517277,
        lon: 13.4016359,
        name: "Humboldt Forum im Berliner Schloss",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJ61P_Gt9RqEcR0Zp4VZCfHHw",
        place_types: [
          "atm",
          "tourist_attraction",
          "cafe",
          "finance",
          "museum",
          "restaurant",
          "food",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.4,
      },
      {
        lat: 52.5074434,
        lon: 13.3903913,
        name: "Checkpoint Charlie",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJzdgmXNFRqEcRyIl9R0IApSM",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.1,
      },
      {
        lat: 52.5194665,
        lon: 13.3987445,
        name: "Altes Museum",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJM28dat1RqEcRu_1H_QZRHrY",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 52.5168107,
        lon: 13.4140847,
        name: "Alte Berliner Stadtmauer",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJE-n_xiNOqEcRnwxMSTYLr9A",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.4,
      },
      {
        lat: 52.5082174,
        lon: 13.3769992,
        name: "Berlin and car culture - Walking Tour ESP/ENG",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ22MIb_FRqEcRQDIuOV8ip7Q",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 5,
      },
      {
        lat: 52.51632679999999,
        lon: 13.3998943,
        name: "Freedom and Unity Memorial",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/monument_pinlet",
        place_id: "ChIJfYWeG8RRqEcRYuZayADtE6c",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 2.8,
      },
      {
        lat: 52.51439329999999,
        lon: 13.3924143,
        name: "Französischer Dom",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ4ZsybtpRqEcR6CrYP51_Fi0",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 52.5181519,
        lon: 13.3969499,
        name: "German Historical Museum",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJnZP4HtxRqEcRw0epcRGQ-_k",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
    ],
  },
  {
    name: "Venedik",
    tourHeader: "Sular Üstünde: Venedik'in Romantizmi",
    tourImage: "https://medyascope.tv/wp-content/uploads/2023/09/venedik1.webp",
    places: [
      {
        lat: 45.4340359,
        lon: 12.3390331,
        name: "Aziz Mark'ın Çan Kulesi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJt92SstCxfkcR9D1UnQrkRq4",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.4337035,
        lon: 12.3403894,
        name: "Palazzo Ducale",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJiYRBbtexfkcR0XTK3ATSCbg",
        place_types: [
          "museum",
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.4345606,
        lon: 12.3397124,
        name: "San Marco Bazilikası",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
        place_id: "ChIJv2xSZNexfkcRBaKsgyfVEgo",
        place_types: [
          "tourist_attraction",
          "church",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.43404959999999,
        lon: 12.3408544,
        name: "Ahlar Köprüsü",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJwwEk49exfkcR0BTo2j_W1Xo",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 45.4341668,
        lon: 12.3384717,
        name: "San Marco Meydanı",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJiYRBbtexfkcRG_b_RJa70AI",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.4379842,
        lon: 12.335898,
        name: "Rialto Köprüsü",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJOzqj-sexfkcRicyOKaERIHM",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.430675,
        lon: 12.3347626,
        name: "Santa Maria della Salute Bazilikası",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
        place_id: "ChIJ241oDzOwfkcRXyfdym_t-ck",
        place_types: [
          "tourist_attraction",
          "church",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.4348579,
        lon: 12.3345337,
        name: "Palazzo Contarini del Bovolo",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJe05PnNCxfkcRIDheMhfPZfU",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 45.4347587,
        lon: 12.3389668,
        name: "St. Mark Saat Kulesi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJLbrmd9exfkcR4YVP0azgB4g",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.4348502,
        lon: 12.3499009,
        name: "Venedik Tersanesi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ64TU6yWufkcRhn7M6ooFgHU",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 45.4342465,
        lon: 12.3398201,
        name: "Carta Gate",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJY8vTmtexfkcRLBIbtGmblos",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.4335502,
        lon: 12.3269754,
        name: "Ca' Rezzonico",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJ10rFUc6xfkcRXf3NUR_5e78",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 45.4369864,
        lon: 12.3266004,
        name: "Frari Santa Maria Gloriosa Bazilikası",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
        place_id: "ChIJm6Zpg8WxfkcRC_yc4Q1GulQ",
        place_types: [
          "tourist_attraction",
          "church",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.4393702,
        lon: 12.339224,
        name: "Church of Saint Mary of Miracles",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
        place_id: "ChIJ62lRTdmxfkcRyvFRIr5As2c",
        place_types: [
          "tourist_attraction",
          "church",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 45.4336376,
        lon: 12.3337579,
        name: "Fenice Tiyatrosu",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJr24y6dCxfkcRGiZJP4wZoig",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.44315719999999,
        lon: 12.3320601,
        name: "Monument to Paolo Sarpi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJF8Gq58KxfkcRIJFyXt3uc6k",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 45.4316504,
        lon: 12.3289078,
        name: "Accademia Köprüsü",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJjYs6_dGxfkcRJYlQcj3fDKk",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 45.44146850000001,
        lon: 12.3152672,
        name: "Venice",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJNybomMmxfkcRzZsCa_Y8eGI",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.9,
      },
      {
        lat: 45.4363568,
        lon: 12.3322494,
        name: "Büyük Kanal",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJfwNXbMOxfkcR3fggw8fOvfE",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.8,
      },
      {
        lat: 45.4310784,
        lon: 12.3281394,
        name: "Accademia",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJc8AdAs6xfkcRaxen7t_aOcs",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
    ],
  },
  {
    name: "Granada",
    tourHeader: "Endülüs'ün İncisi: Granada'nın Mirası",
    tourImage:
      "https://cdn.getyourguide.com/img/tour/4d9dcddd2b8d52f0.jpeg/98.jpg",
    places: [
      {
        lat: 37.1760783,
        lon: -3.5881413,
        name: "El Hamra Sarayı",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJO7l_l7f8cQ0Rf6IhEu_RjYA",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.8,
      },
      {
        lat: 37.1765906,
        lon: -3.5990649,
        name: "Granada Katedrali",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
        place_id: "ChIJqWuDsb_8cQ0RwlE55Uv7_nA",
        place_types: [
          "tourist_attraction",
          "church",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 37.1811058,
        lon: -3.5926637,
        name: "Mirador de San Nicolás",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJlc_oycf8cQ0RmGSbIT5svlk",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 37.1774605,
        lon: -3.5984368,
        name: "Granada",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJfcIyLeb8cQ0Rcg1g0533WJI",
        place_types: ["locality", "political"],
        rating: 4.2,
      },
      {
        lat: 37.176821,
        lon: -3.5899536,
        name: "V. Karl Sarayı",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJO7l_l7f8cQ0RLH23wRgnqec",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 37.1763713,
        lon: -3.598606299999999,
        name: "Royal Chapel of Granada",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
        place_id: "ChIJJT_b_778cQ0RmwUjKxl7yWM",
        place_types: [
          "church",
          "tourist_attraction",
          "museum",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 37.1760561,
        lon: -3.5983081,
        name: "Palacio de la Madraza",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJB72pA7_8cQ0REszZtPf7WO0",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 37.1923142,
        lon: -3.5997816,
        name: 'Monasterio de Nuestra Señora de la Asunción "La Cartuja"',
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJO5izqd38cQ0R7mK9hk7jOdg",
        place_types: [
          "tourist_attraction",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 37.1756303,
        lon: -3.5974733,
        name: "Plaza Isabel La Católica",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ13-z3r78cQ0RW9X4DriuAl0",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 37.1806656,
        lon: -3.6029815,
        name: "Basílica de San Juan de Dios",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
        place_id: "ChIJwSw3jer8cQ0RNV7dEBuDHzg",
        place_types: [
          "tourist_attraction",
          "church",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 37.1767291,
        lon: -3.5959164,
        name: "Granada Centre",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJAf4eA1v9cQ0R77wA1viAoP8",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 37.1774137,
        lon: -3.5896794,
        name: "Nasrid Palaces",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ2-XEuLf8cQ0RBLrtcEivoDw",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.8,
      },
      {
        lat: 37.1683077,
        lon: -3.5961251,
        name: "Puente Romano",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJI0NFUbv8cQ0RGaHqfa8LRyQ",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 37.1832846,
        lon: -3.596218299999999,
        name: "Mirador de San Cristóbal",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJOzD_sMb8cQ0RlXsnGGQJ3Gk",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 37.1624608,
        lon: -3.6068027,
        name: "Parque de las Ciencias",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJY1N6W578cQ0RlUdw_5yVKic",
        place_types: [
          "tourist_attraction",
          "amusement_park",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 37.1783259,
        lon: -3.5928757,
        name: "El Bañuelo",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ3Qt_c7j8cQ0R8aYWnhRTfxE",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.2,
      },
      {
        lat: 37.177076,
        lon: -3.589253,
        name: "Patio de Los Leones",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJA_g-sbf8cQ0RjO4rPZ5NrCQ",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.9,
      },
      {
        lat: 37.1780017,
        lon: -3.5854777,
        name: "Generalife",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJm7j2hbb8cQ0RVf1WQjXGxBk",
        place_types: [
          "museum",
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.8,
      },
      {
        lat: 37.1761036,
        lon: -3.6016488,
        name: "Trinity Square",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ79TXfZX8cQ0RoeuqRI2yyno",
        place_types: [
          "tourist_attraction",
          "park",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.3,
      },
      {
        lat: 37.17009669999999,
        lon: -3.596860099999999,
        name: "Basílica Virgen de las Angustias",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
        place_id: "ChIJBVgOg7z8cQ0R8zAMcEnNACQ",
        place_types: [
          "tourist_attraction",
          "church",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
    ],
  },
  {
    name: "Amsterdam",
    tourHeader: "Kanal Şehri: Amsterdam'ın Renkleri",
    tourImage:
      "https://blog.piriguide.com/wp-content/uploads/2022/11/Amsterdam-Gezi-Rehberi-ve-Gezilecek-Yerler-1024x680.jpg",
    places: [
      {
        lat: 52.3579946,
        lon: 4.8686484,
        name: "Vondelpark",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/tree_pinlet",
        place_id: "ChIJz3y0xeIJxkcRNcogBVV41Gw",
        place_types: [
          "park",
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 52.3728543,
        lon: 4.893706799999999,
        name: "National Monument",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJEUO-OccJxkcR4VAAGRIGuKA",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.4,
      },
      {
        lat: 52.3701599,
        lon: 4.8921108,
        name: "The Amsterdam Dungeon",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJC7Uw48AJxkcR28umcgx0C6k",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.4,
      },
      {
        lat: 52.3731835,
        lon: 4.8913758,
        name: "Amsterdam Kraliyet Sarayı",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJFQ6IwMYJxkcRis8dtZlOkTk",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 52.3599976,
        lon: 4.8852188,
        name: "Rijksmuseum Amsterdam",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJ5Ra7we4JxkcRhYVAaq5zQ9U",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 52.3752182,
        lon: 4.8839765,
        name: "Anne Frank'ın Evi",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJSRE-IcUJxkcRCltjPmVdmtQ",
        place_types: [
          "museum",
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 52.3660003,
        lon: 4.9165321,
        name: "Artis",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJYQCs26EJxkcRPUqKm3hTaA4",
        place_types: [
          "zoo",
          "aquarium",
          "tourist_attraction",
          "park",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 52.37187170000001,
        lon: 4.8958282,
        name: "Oude Doelenstraat",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJgd8UOqQJxkcR4XUhj1NDnTQ",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.6,
      },
      {
        lat: 52.3745479,
        lon: 4.8995369,
        name: "De Wallen Red Light District Amsterdam",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJFepCr0wJxkcR_Y1lRcENFG0",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.4,
      },
      {
        lat: 52.3712444,
        lon: 4.8978142,
        name: "Walekerkpoort",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ-cCxPtIJxkcRSvdhGA-KmJI",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 3.3,
      },
      {
        lat: 52.3663279,
        lon: 4.8895832,
        name: "de Gouden bocht",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJTRXZ_kcJxkcRtMmJlSJxqlo",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.3,
      },
      {
        lat: 52.3748239,
        lon: 4.8947471,
        name: "BODY WORLDS Amsterdam",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJ3XSZnccJxkcR-rNgffJJMGI",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 52.367041,
        lon: 4.8932901,
        name: "Munttoren",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJZabaHsAJxkcRy92UyRY-mT0",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 52.36691889999999,
        lon: 4.907623,
        name: "Hortus Botanicus",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/tree_pinlet",
        place_id: "ChIJqxRzZuLhxUcRpgvqX1nIp1A",
        place_types: [
          "tourist_attraction",
          "park",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 52.3731006,
        lon: 4.8924274,
        name: "Dam Square",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJq-ry-tkJxkcR8i94uYaBUig",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 52.3803068,
        lon: 4.8916053,
        name: "Amsterdam Center View",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJSesAIckJxkcRcenskBkelo4",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 52.37388379999999,
        lon: 4.8917027,
        name: "The New Church",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJ0T84-8YJxkcRpAGwFD2ingI",
        place_types: [
          "museum",
          "tourist_attraction",
          "church",
          "place_of_worship",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.3,
      },
      {
        lat: 52.3718714,
        lon: 4.8958689,
        name: "Channel View",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJwQ9ViYsJxkcRSJhsKkEtGJc",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
      {
        lat: 52.3741709,
        lon: 4.912325,
        name: "NEMO",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet",
        place_id: "ChIJm7tV_qQJxkcRvM4CYqK9SMc",
        place_types: [
          "tourist_attraction",
          "museum",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.5,
      },
      {
        lat: 52.3623657,
        lon: 4.8834734,
        name: "Rembrandts Amsterdam Experience",
        place_icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        place_id: "ChIJ62QMX8cJxkcRIsuFRMFZVBw",
        place_types: [
          "tourist_attraction",
          "point_of_interest",
          "establishment",
        ],
        rating: 4.7,
      },
    ],
  },
];

function CarouselComponent() {
  const navigation = useNavigation();

  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = (event) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / carouselItemWidth
    );
    setActiveSlide(slideIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {tours.map((tour, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("TourScreen", { tourData: tour })
            }
          >
            <View style={[styles.slide, { width: carouselItemWidth }]}>
              <ImageBackground
                style={styles.image}
                source={{ uri: tour.tourImage }}
              >
                <View style={styles.overlay}>
                  <Text style={styles.description}>{tour.name}</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {tours.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeSlide && { backgroundColor: "black" },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slide: {
    height: 340,
  },
  image: {
    width: "100%", // Görüntü genişliğini kapsayacak şekilde ayarla
    height: "100%", // Görüntü yüksekliğini kapsayacak şekilde ayarla
    overflow: "hidden",
    resizeMode: "contain",
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 5,
    right: 250,
    padding: 10,
    width: 250,
    width: 150,
    height: 40,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    justifyContent: "flex-start",
    fontStyle: "italic",
  },
  description: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    justifyContent: "flex-start",
    fontStyle: "italic",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 20,
    paddingVertical: 8,
  },
  paginationDot: {
    width: 23,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "white",
  },
});

export default CarouselComponent;
