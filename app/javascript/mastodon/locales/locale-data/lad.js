/*eslint eqeqeq: "off"*/
/*eslint no-nested-ternary: "off"*/

export default [
  {
    locale: "lad",
    pluralRuleFunction: function (e, a) {
        return a ? "other" : 1 == e ? "one" : "other";
    },
    fields: {
      year: {
        displayName: "anyo",
        relative: {
          0: "este anyo",
          1: "el anyo ke viene",
          "-1": "el anyo pasado"
        },
        relativeTime: {
          future: {
            one: "dentro de {0} anyo",
            other: "dentro de {0} anyos"
          },
          past: {
            one: "antes {0} anyo",
            other: "antes {0} anyos"
          }
        }
      },
      month: {
        displayName: "mez",
        relative: {
          0: "este mez",
          1: "el mez ke viene",
          "-1": "el mez pasado"
        },
        relativeTime: {
          future: {
            one: "dentro de {0} mez",
            other: "dentro de {0} mezes"
          },
          past: {
            one: "antes {0} mez",
            other: "antes {0} mezes"
          }
        }
      },
      day: {
        displayName: "diya",
        relative: {
          0: "oy",
          1: "amanyana",
          2: "pasado amanyana",
          "-2": "antiyer",
          "-1": "ayer"
        },
        relativeTime: {
          future: {
            one: "dentro de {0} diya",
            other: "dentro de {0} diyas"
          },
          past: {
            one: "antes {0} diya",
            other: "antes {0} diyas"
          }
        }
      },
      hour: {
        displayName: "ora",
        relative: {
          0: "esta ora"
        },
        relativeTime: {
          future: {
            one: "dentro de {0} ora",
            other: "dentro de {0} oras"
          },
          past: {
            one: "antes {0} ora",
            other: "antes {0} oras"
          }
        }
      },
      minute: {
        displayName: "minuto",
        relative: {
          0: "este minuto"
        },
        relativeTime: {
          future: {
            one: "dentro de {0} minuto",
            other: "dentro de {0} minutos"
          },
          past: {
            one: "antes {0} minuto",
            other: "antes {0} minutos"
          }
        }
      },
      second: {
        displayName: "sigundo",
        relative: {
          0: "agora"
        },
        relativeTime: {
          future: {
            one: "dentro de {0} sigundo",
            other: "dentro de {0} sigundos"
          },
          past: {
            one: "antes {0} sigundo",
            other: "antes {0} sigundos"
          }
        }
      }
    }
  }
]