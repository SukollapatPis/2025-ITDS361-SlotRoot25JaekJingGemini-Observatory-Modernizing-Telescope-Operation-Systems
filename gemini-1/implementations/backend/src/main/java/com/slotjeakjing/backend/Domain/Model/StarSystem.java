package com.slotjeakjing.backend.Domain.Model;

import com.slotjeakjing.backend.Enum.Quadrant;

public final class StarSystem {
    public static enum CONSTELLATIONS {
        ANDROMEDA("Andromeda", 722.278, Quadrant.NQ1, 90, 40, 11),
        ANTLIA("Air Pump", 238.901, Quadrant.SQ2, 45, 90, 4),
        APUS("Bird of Paradise", 206.327, Quadrant.SQ3, 5, 90, 7),
        AQUARIUS("Water Bearer", 979.854, Quadrant.SQ4, 65, 90, 10),
        AQUILA("Eagle", 652.473, Quadrant.NQ4, 90, 75, 8),
        ARA("Altar", 237.057, Quadrant.SQ3, 25, 90, 7),
        ARIES("Ram", 441.395, Quadrant.NQ1, 90, 60, 12),
        AURIGA("Charioteer", 657.438, Quadrant.NQ2, 90, 40, 2),
        BOOTES("Herdsman", 906.831, Quadrant.NQ3, 90, 50, 6),
        CAELUM("Chisel", 124.865, Quadrant.SQ1, 40, 90, 1),
        CAMELOPARDALIS("Giraffe", 756.828, Quadrant.NQ2, 90, 10, 2),
        CANCER("Crab", 505.872, Quadrant.NQ2, 90, 60, 3),
        CANES_VENATICI("Hunting Dogs", 465.194, Quadrant.NQ3, 90, 40, 5),
        CANIS_MAJOR("Greater Dog", 380.118, Quadrant.SQ2, 60, 90, 2),
        CANIS_MINOR("Lesser Dog", 183.367, Quadrant.NQ2, 90, 75, 3),
        CAPRICORNUS("Sea Goat", 413.947, Quadrant.SQ4, 60, 90, 9),
        CARINA("Keel", 494.184, Quadrant.SQ2, 20, 90, 3),
        CASSIOPEIA("Cassiopeia", 598.407, Quadrant.NQ1, 90, 20, 11),
        CENTAURUS("Centaur", 1060.422, Quadrant.SQ3, 25, 90, 5),
        CEPHEUS("Cepheus", 587.787, Quadrant.NQ4, 90, 10, 11),
        CETUS("Whale (or Sea Monster)", 1231.411, Quadrant.SQ1, 70, 90, 11),
        CHAMAELEON("Chameleon", 131.592, Quadrant.SQ2, 0, 90, 4),
        CIRCINUS("Compass (drafting tool)", 93.353, Quadrant.SQ3, 30, 90, 7),
        COLUMBA("Dove", 270.184, Quadrant.SQ1, 45, 90, 2),
        COMA_BERENICES("Berenice’s Hair", 386.475, Quadrant.NQ3, 90, 70, 5),
        CORONA_AUSTRALIS("Southern Crown", 127.696, Quadrant.SQ4, 40, 90, 8),
        CORONA_BOREALIS("Northern Crown", 178.71, Quadrant.NQ3, 90, 50, 7),
        CORVUS("Crow", 183.801, Quadrant.SQ3, 60, 90, 5),
        CRATER("Cup", 282.398, Quadrant.SQ2, 65, 90, 4),
        CRUX("Southern Cross", 68.447, Quadrant.SQ3, 20, 90, 5),
        CYGNUS("Swan", 803.983, Quadrant.NQ4, 90, 40, 9),
        DELPHINUS("Dolphin", 188.549, Quadrant.NQ4, 90, 70, 9),
        DORADO("Dolphinfish", 179.173, Quadrant.SQ1, 20, 90, 1),
        DRACO("Dragon", 1082.952, Quadrant.NQ3, 90, 15, 7),
        EQUULEUS("Little Horse (Foal)", 71.641, Quadrant.NQ4, 90, 80, 9),
        ERIDANUS("Eridanus (river)", 1137.919, Quadrant.SQ1, 32, 90, 12),
        FORNAX("Furnace", 397.502, Quadrant.SQ1, 50, 90, 12),
        GEMINI("Twins", 513.761, Quadrant.NQ2, 90, 60, 2),
        GRUS("Crane", 365.513, Quadrant.SQ4, 34, 90, 10),
        HERCULES("Hercules", 1225.148, Quadrant.NQ3, 90, 50, 7),
        HOROLOGIUM("Pendulum Clock", 248.885, Quadrant.SQ1, 30, 90, 12),
        HYDRA("Hydra", 1302.844, Quadrant.SQ2, 54, 83, 4),
        HYDRUS("Water Snake", 243.035, Quadrant.SQ1, 8, 90, 11),
        INDUS("Indian", 294.006, Quadrant.SQ4, 15, 90, 9),
        LACERTA("Lizard", 200.688, Quadrant.NQ4, 90, 40, 10),
        LEO("Lion", 946.964, Quadrant.NQ2, 90, 65, 4),
        LEO_MINOR("Lesser Lion", 231.956, Quadrant.NQ2, 90, 45, 4),
        LEPUS("Hare", 290.291, Quadrant.SQ1, 63, 90, 1),
        LIBRA("Scales", 538.052, Quadrant.SQ3, 65, 90, 6),
        LUPUS("Wolf", 333.683, Quadrant.SQ3, 35, 90, 6),
        LYNX("Lynx", 545.386, Quadrant.NQ2, 90, 55, 3),
        LYRA("Lyre", 286.476, Quadrant.NQ4, 90, 40, 8),
        MENSA("Table Mountain", 153.484, Quadrant.SQ1, 4, 90, 1),
        MICROSCOPIUM("Microscope", 209.513, Quadrant.SQ4, 45, 90, 9),
        MONOCEROS("Unicorn", 481.569, Quadrant.NQ2, 75, 90, 2),
        MUSCA("Fly", 138.355, Quadrant.SQ3, 10, 90, 5),
        NORMA("Level", 165.29, Quadrant.SQ3, 30, 90, 7),
        OCTANS("Octant", 291.045, Quadrant.SQ4, 0, 90, 10),
        OPHIUCHUS("Serpent Bearer", 948.34, Quadrant.SQ3, 80, 80, 7),
        ORION("Orion (the Hunter)", 594.12, Quadrant.NQ1, 85, 75, 1),
        PAVO("Peacock", 377.666, Quadrant.SQ4, 30, 90, 8),
        PEGASUS("Pegasus", 1120.794, Quadrant.NQ4, 90, 60, 10),
        PERSEUS("Perseus", 614.997, Quadrant.NQ1, 90, 35, 12),
        PHOENIX("Phoenix", 469.319, Quadrant.SQ1, 32, 80, 11),
        PICTOR("Easel", 246.739, Quadrant.SQ1, 26, 90, 1),
        PISCES("Fishes", 889.417, Quadrant.NQ1, 90, 65, 11),
        PISCIS_AUSTRINUS("Southern Fish", 245.375, Quadrant.SQ4, 55, 90, 10),
        PUPPIS("Stern", 673.434, Quadrant.SQ2, 40, 90, 2),
        PYXIS("Compass", 220.833, Quadrant.SQ2, 50, 90, 3),
        RETICULUM("Reticle", 113.936, Quadrant.SQ1, 23, 90, 1),
        SAGITTA("Arrow", 79.932, Quadrant.NQ4, 90, 70, 8),
        SAGITTARIUS("Archer", 867.432, Quadrant.SQ4, 55, 90, 8),
        SCORPIUS("Scorpion", 496.783, Quadrant.SQ3, 40, 90, 7),
        SCULPTOR("Sculptor", 474.764, Quadrant.SQ1, 50, 90, 11),
        SCUTUM("Shield (of Sobieski)", 109.114, Quadrant.SQ4, 80, 90, 8),
        SERPENS("Snake", 636.928, Quadrant.NQ3, 80, 80, 7),
        SEXTANS("Sextant", 313.515, Quadrant.SQ2, 80, 90, 4),
        TAURUS("Bull", 797.249, Quadrant.NQ1, 90, 65, 1),
        TELESCOPIUM("Telescope", 251.512, Quadrant.SQ4, 40, 90, 8),
        TRIANGULUM("Triangle", 131.847, Quadrant.NQ1, 90, 60, 12),
        TRIANGULUM_AUSTRALE("Southern Triangle", 109.978, Quadrant.SQ3, 25, 90, 7),
        TUCANA("Toucan", 294.557, Quadrant.SQ4, 25, 90, 11),
        URSA_MAJOR("Great Bear", 1279.66, Quadrant.NQ2, 90, 30, 4),
        URSA_MINOR("Little Bear", 255.864, Quadrant.NQ3, 90, 10, 6),
        VELA("Sails", 499.649, Quadrant.SQ2, 30, 90, 3),
        VIRGO("Virgin (Maiden)", 1294.428, Quadrant.SQ3, 80, 80, 5),
        VOLANS("Flying Fish", 141.354, Quadrant.SQ2, 15, 90, 3),
        VULPECULA("Fox", 268.165, Quadrant.NQ4, 90, 55, 11);

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