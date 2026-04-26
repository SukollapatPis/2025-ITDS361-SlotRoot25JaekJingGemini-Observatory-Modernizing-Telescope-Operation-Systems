package com.slotjeakjing.backend.Domain.Model;

import com.slotjeakjing.backend.Enum.Quadrant;

public final class StarSystem {
    public static enum CONSTELLATIONS {
        Andromeda("Andromeda", 722.278, Quadrant.NQ1, 90, 40, 11),
        Antlia("Air Pump", 238.901, Quadrant.SQ2, 45, 90, 4),
        Apus("Bird of Paradise", 206.327, Quadrant.SQ3, 5, 90, 7),
        Aquarius("Water Bearer", 979.854, Quadrant.SQ4, 65, 90, 10),
        Aquila("Eagle", 652.473, Quadrant.NQ4, 90, 75, 8),
        Ara("Altar", 237.057, Quadrant.SQ3, 25, 90, 7),
        Aries("Ram", 441.395, Quadrant.NQ1, 90, 60, 12),
        Auriga("Charioteer", 657.438, Quadrant.NQ2, 90, 40, 2),
        Boötes("Herdsman", 906.831, Quadrant.NQ3, 90, 50, 6),
        Caelum("Chisel", 124.865, Quadrant.SQ1, 40, 90, 1),
        Camelopardalis("Giraffe", 756.828, Quadrant.NQ2, 90, 10, 2),
        Cancer("Crab", 505.872, Quadrant.NQ2, 90, 60, 3),
        CanesVenatici("Hunting Dogs", 465.194, Quadrant.NQ3, 90, 40, 5),
        CanisMajor("Greater Dog", 380.118, Quadrant.SQ2, 60, 90, 2),
        CanisMinor("Lesser Dog", 183.367, Quadrant.NQ2, 90, 75, 3),
        Capricornus("Sea Goat", 413.947, Quadrant.SQ4, 60, 90, 9),
        Carina("Keel", 494.184, Quadrant.SQ2, 20, 90, 3),
        Cassiopeia("Cassiopeia", 598.407, Quadrant.NQ1, 90, 20, 11),
        Centaurus("Centaur", 1060.422, Quadrant.SQ3, 25, 90, 5),
        Cepheus("Cepheus", 587.787, Quadrant.NQ4, 90, 10, 11),
        Cetus("Whale (or Sea Monster)", 1231.411, Quadrant.SQ1, 70, 90, 11),
        Chamaeleon("Chameleon", 131.592, Quadrant.SQ2, 0, 90, 4),
        Circinus("Compass (drafting tool)", 93.353, Quadrant.SQ3, 30, 90, 7),
        Columba("Dove", 270.184, Quadrant.SQ1, 45, 90, 2),
        ComaBerenices("Berenice’s Hair", 386.475, Quadrant.NQ3, 90, 70, 5),
        CoronaAustralis("Southern Crown", 127.696, Quadrant.SQ4, 40, 90, 8),
        CoronaBorealis("Northern Crown", 178.71, Quadrant.NQ3, 90, 50, 7),
        Corvus("Crow", 183.801, Quadrant.SQ3, 60, 90, 5),
        Crater("Cup", 282.398, Quadrant.SQ2, 65, 90, 4),
        Crux("Southern Cross", 68.447, Quadrant.SQ3, 20, 90, 5),
        Cygnus("Swan", 803.983, Quadrant.NQ4, 90, 40, 9),
        Delphinus("Dolphin", 188.549, Quadrant.NQ4, 90, 70, 9),
        Dorado("Dolphinfish", 179.173, Quadrant.SQ1, 20, 90, 1),
        Draco("Dragon", 1082.952, Quadrant.NQ3, 90, 15, 7),
        Equuleus("Little Horse (Foal)", 71.641, Quadrant.NQ4, 90, 80, 9),
        Eridanus("Eridanus (river)", 1137.919, Quadrant.SQ1, 32, 90, 12),
        Fornax("Furnace", 397.502, Quadrant.SQ1, 50, 90, 12),
        Gemini("Twins", 513.761, Quadrant.NQ2, 90, 60, 2),
        Grus("Crane", 365.513, Quadrant.SQ4, 34, 90, 10),
        Hercules("Hercules", 1225.148, Quadrant.NQ3, 90, 50, 7),
        Horologium("Pendulum Clock", 248.885, Quadrant.SQ1, 30, 90, 12),
        Hydra("Hydra", 1302.844, Quadrant.SQ2, 54, 83, 4),
        Hydrus("Water Snake", 243.035, Quadrant.SQ1, 8, 90, 11),
        Indus("Indian", 294.006, Quadrant.SQ4, 15, 90, 9),
        Lacerta("Lizard", 200.688, Quadrant.NQ4, 90, 40, 10),
        Leo("Lion", 946.964, Quadrant.NQ2, 90, 65, 4),
        LeoMinor("Lesser Lion", 231.956, Quadrant.NQ2, 90, 45, 4),
        Lepus("Hare", 290.291, Quadrant.SQ1, 63, 90, 1),
        Libra("Scales", 538.052, Quadrant.SQ3, 65, 90, 6),
        Lupus("Wolf", 333.683, Quadrant.SQ3, 35, 90, 6),
        Lynx("Lynx", 545.386, Quadrant.NQ2, 90, 55, 3),
        Lyra("Lyre", 286.476, Quadrant.NQ4, 90, 40, 8),
        Mensa("Table Mountain", 153.484, Quadrant.SQ1, 4, 90, 1),
        Microscopium("Microscope", 209.513, Quadrant.SQ4, 45, 90, 9),
        Monoceros("Unicorn", 481.569, Quadrant.NQ2, 75, 90, 2),
        Musca("Fly", 138.355, Quadrant.SQ3, 10, 90, 5),
        Norma("Level", 165.29, Quadrant.SQ3, 30, 90, 7),
        Octans("Octant", 291.045, Quadrant.SQ4, 0, 90, 10),
        Ophiuchus("Serpent Bearer", 948.34, Quadrant.SQ3, 80, 80, 7),
        Orion("Orion (the Hunter)", 594.12, Quadrant.NQ1, 85, 75, 1),
        Pavo("Peacock", 377.666, Quadrant.SQ4, 30, 90, 8),
        Pegasus("Pegasus", 1120.794, Quadrant.NQ4, 90, 60, 10),
        Perseus("Perseus", 614.997, Quadrant.NQ1, 90, 35, 12),
        Phoenix("Phoenix", 469.319, Quadrant.SQ1, 32, 80, 11),
        Pictor("Easel", 246.739, Quadrant.SQ1, 26, 90, 1),
        Pisces("Fishes", 889.417, Quadrant.NQ1, 90, 65, 11),
        PiscisAustrinus("Southern Fish", 245.375, Quadrant.SQ4, 55, 90, 10),
        Puppis("Stern", 673.434, Quadrant.SQ2, 40, 90, 2),
        Pyxis("Compass", 220.833, Quadrant.SQ2, 50, 90, 3),
        Reticulum("Reticle", 113.936, Quadrant.SQ1, 23, 90, 1),
        Sagitta("Arrow", 79.932, Quadrant.NQ4, 90, 70, 8),
        Sagittarius("Archer", 867.432, Quadrant.SQ4, 55, 90, 8),
        Scorpius("Scorpion", 496.783, Quadrant.SQ3, 40, 90, 7),
        Sculptor("Sculptor", 474.764, Quadrant.SQ1, 50, 90, 11),
        Scutum("Shield (of Sobieski)", 109.114, Quadrant.SQ4, 80, 90, 8),
        Serpens("Snake", 636.928, Quadrant.NQ3, 80, 80, 7),
        Sextans("Sextant", 313.515, Quadrant.SQ2, 80, 90, 4),
        Taurus("Bull", 797.249, Quadrant.NQ1, 90, 65, 1),
        Telescopiu("Telescope", 251.512, Quadrant.SQ4, 40, 90, 8),
        Triangulum("Triangle", 131.847, Quadrant.NQ1, 90, 60, 12),
        TriangulumAustrale("Southern Triangle", 109.978, Quadrant.SQ3, 25, 90, 7),
        Tucana("Toucan", 294.557, Quadrant.SQ4, 25, 90, 11),
        UrsaMajor("Great Bear", 1279.66, Quadrant.NQ2, 90, 30, 4),
        UrsaMinor("Little Bear", 255.864, Quadrant.NQ3, 90, 10, 6),
        Vela("Sails", 499.649, Quadrant.SQ2, 30, 90, 3),
        Virgo("Virgin (Maiden)", 1294.428, Quadrant.SQ3, 80, 80, 5),
        Volans("Flying Fish", 141.354, Quadrant.SQ2, 15, 90, 3),
        Vulpecula("Fox", 268.165, Quadrant.NQ4, 90, 55, 11);

        public final String description;
        public final double area;
        public final Quadrant quadrant;
        public final int startingLatitude;
        public final int endingLatitude;
        public final int month;

        private CONSTELLATIONS(String description, double area, Quadrant quadrant, int startingLatitude, int endingLatitude, int month) {
            this.description = description;
            this.area = area;
            this.quadrant = quadrant;
            this.startingLatitude = startingLatitude;
            this.endingLatitude = endingLatitude;
            this.month = month;
        }

        public Quadrant getQuadrant() {
            return this.quadrant;
        }

        public int getMonth() {
            return this.month;
        }
    }
}