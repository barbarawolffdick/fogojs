var express = require('express');
var router = express.Router();
var parse = require('csv-parse');
var fs = require('fs');

function csvRead(filename, fn) {
  fs.readFile('./public/javascripts/csv/' + filename + '.csv', 'utf8', function(err, contents) {
    const output = []
    parse(contents, {
      columns: true,
      skip_empty_lines: true,
    })
    .on('readable', function(){
      let record
      while (record = this.read()) {
        output.push(record)
      }
    })
    .on('end', function() {
      fn(output)
    })
  });
}

/* Função de ranking em BAIRROS na região metropolitana */
router.get('/bairros', function(req, res, next) {
  csvRead('rbairros_rm', function(data) {
    const output = { labels: [], values: [] }

    var disparos = data
    .map(function(el){ // transforma disparos em Int (é string)
      el.disparos = parseInt(el.disparos)
      return el
    })
    .sort(function(a, b) { // ordena por qtd de disparos
      return b.disparos - a.disparos
    })
    .slice(0, 10) // pega os 5 primeiros
    .forEach(function(el){ // adiciona bairros e disparos no objeto output
      output.labels.push(el.bairros)
      output.values.push(el.disparos)
    }, this)

    res.send(output) // envia o objeto final
  })
});

/* Função de ranking em MUNICIPIOS na região metropolitana */
router.get('/municipios', function(req, res, next) {
  csvRead('rmunicipios', function(data) {
    const output = { labels: [], values: [] }

    var disparos = data
    .map(function(el){ // transforma disparos em Int (é string)
      el.disparos = parseInt(el.disparos)
      return el
    })
    .sort(function(a, b) { // ordena por qtd de disparos
      return b.disparos - a.disparos
    })
    .slice(0, 10) // pega os 5 primeiros
    .forEach(function(el){ // adiciona bairros e disparos no objeto output
      output.labels.push(el.municipios)
      output.values.push(el.disparos)
    }, this)

    res.send(output) // envia o objeto final
  })
});

/* Função de ranking em BELFORD ROXO na região metropolitana */
router.get('/broxo', function(req, res, next) {
  csvRead('rbelfordroxo', function(data) {
    const output = { labels: [], values: [] }

    var disparos = data
    .map(function(el){ // transforma disparos em Int (é string)
      el.disparos = parseInt(el.disparos)
      return el
    })
    .sort(function(a, b) { // ordena por qtd de disparos
      return b.disparos - a.disparos
    })
    .slice(0, 10) // pega os 5 primeiros
    .forEach(function(el){ // adiciona bairros e disparos no objeto output
      output.labels.push(el.bairros)
      output.values.push(el.disparos)
    }, this)

    res.send(output) // envia o objeto final
  })
});


/* Função de ranking em SAO GONÇALO na região metropolitana */
router.get('/saogoncalo', function(req, res, next) {
  csvRead('rsaogoncalo', function(data) {
    const output = { labels: [], values: [] }

    var disparos = data
    .map(function(el){ // transforma disparos em Int (é string)
      el.disparos = parseInt(el.disparos)
      return el
    })
    .sort(function(a, b) { // ordena por qtd de disparos
      return b.disparos - a.disparos
    })
    .slice(0, 10) // pega os 5 primeiros
    .forEach(function(el){ // adiciona bairros e disparos no objeto output
      output.labels.push(el.bairros)
      output.values.push(el.disparos)
    }, this)

    res.send(output) // envia o objeto final
  })
});

/* Função de ranking em UPP na região metropolitana */
router.get('/upp', function(req, res, next) {
  csvRead('rupp', function(data) {
    const output = { labels: [], values: [] }

    var disparos = data
    .map(function(el){ // transforma disparos em Int (é string)
      el.disparos = parseInt(el.disparos)
      return el
    })
    .sort(function(a, b) { // ordena por qtd de disparos
      return b.disparos - a.disparos
    })
    .slice(0, 10) // pega os 5 primeiros
    .forEach(function(el){ // adiciona bairros e disparos no objeto output
      output.labels.push(el.bairros)
      output.values.push(el.disparos)
    }, this)

    res.send(output) // envia o objeto final
  })
});



/* Spider chart agentes de segurança */
router.get('/agentesmortos', function(req, res, next) {
  csvRead('ag_seg', function(data) {
    const output = { labels: [], values: [] }
    const group = {}

    data.forEach(function(el){ // transforma disparos em Int (é string)
      if (parseInt(el.mortos) != 0) {
        if (group[el.motivo] == null) group[el.motivo] = 0
        group[el.motivo] = group[el.motivo] + parseInt(el.mortos)
        return el
      }
    })

    for (key in group) {
      output.labels.push(key)
      output.values.push(group[key])
    }

    res.send(output) // envia o objeto final
  })
});

/* Spider chart regioes mortes chacinas*/
router.get('/chacinas', function(req, res, next) {
  csvRead('chacinas', function(data) {
    const output = { labels: [], values: [] }
    const group = {}

    data.forEach(function(el){ // transforma disparos em Int (é string)
      if (parseInt(el.mortos) != 0) {
        if (group[el.municipio] == null) group[el.municipio] = 0
        group[el.municipio] = group[el.municipio] + parseInt(el.mortos)
        return el
      }
    })

    for (key in group) {
      output.labels.push(key)
      output.values.push(group[key])
    }

    res.send(output) // envia o objeto final
  })
});

/* Spider chart regioes mortes chacinas*/
router.get('/bala_perdida', function(req, res, next) {
  csvRead('bala_perdida', function(data) {
    const output = { labels: [], values: [] }
    const group = {}

    data.forEach(function(el){ // transforma disparos em Int (é string)
      if (parseInt(el.atingidos) != 0) {
        if (group[el.bairro] == null) group[el.bairro] = 0
        group[el.bairro] = group[el.bairro] + parseInt(el.atingidos)
        return el
      }
    })

    for (key in group) {
      if (group[key] > 2){
        output.labels.push(key)
        output.values.push(group[key])
      }
    }

    res.send(output) // envia o objeto final
  })
});


/* Spider chart regioes mortes chacinas*/
router.get('/tiroteios', function(req, res, next) {
  csvRead('tiroteio', function(data) {
    const output = { labels: [], values: [] }
    const bala = []

    data.forEach(function(tiroteio){
      bala.push({
        label: tiroteio.bairro + " " + tiroteio.duracao,
        data: [
          {
            x: parseInt(tiroteio.mes),
            y: parseInt(tiroteio.dia),
            r: (parseInt(tiroteio.duracao.replace(/:/g, '')) / 10000)
          }
        ]
      })
    })
    res.send(bala) // envia o objeto final
  })
});

router.get('/ad_bairros', function(req, res,next) {
   csvRead('ad_bairros', function(data){
     const output = { labels: [], antes: [], depois: [] }

     data.forEach(function(el){
       if (el.periodo == "antes") {
         output.labels.push(el.bairros)
         output.antes.push(parseInt(el.disparos))
         output.depois.push(0)
       }
     })

     data.forEach(function(el){
       if (el.periodo == "durante") {
         var n = output.labels.indexOf(el.bairros)
         if (n == -1) {
           output.labels.push(el.bairros)
           output.antes.push(0)
           output.depois.push(parseInt(el.disparos))
         } else {
           output.depois[n] = parseInt(el.disparos)
         }
       }
     })

     res.send(output)
   })
})

router.get('/ad_municipios', function(req, res,next) {
   csvRead('ad_municipio', function(data){
     const output = { labels: [], antes: [], depois: [] }

     data.forEach(function(el){
       if (el.periodo == "antes") {
         output.labels.push(el.municipio)
         output.antes.push(parseInt(el.disparos))
         output.depois.push(0)
       }
     })

     data.forEach(function(el){
       if (el.periodo == "durante") {
         var n = output.labels.indexOf(el.municipio)
         if (n == -1) {
           output.labels.push(el.municipio)
           output.antes.push(0)
           output.depois.push(parseInt(el.disparos))
         } else {
           output.depois[n] = parseInt(el.disparos)
         }
       }
     })

     res.send(output)
   })
})

router.get('/ad_municipiosrio', function(req, res,next) {
   csvRead('ad_municipiosrio', function(data){
     const output = { labels: [], antes: [], depois: [] }

     data.forEach(function(el){
       if (el.periodo == "antes") {
         output.labels.push(el.municipio)
         output.antes.push(parseInt(el.disparos))
         output.depois.push(0)
       }
     })

     data.forEach(function(el){
       if (el.periodo == "durante") {
         var n = output.labels.indexOf(el.municipio)
         if (n == -1) {
           output.labels.push(el.municipio)
           output.antes.push(0)
           output.depois.push(parseInt(el.disparos))
         } else {
           output.depois[n] = parseInt(el.disparos)
         }
       }
     })

     res.send(output)
   })
})

/* Função de ranking em UPP na região metropolitana */
router.get('/criancas', function(req, res, next) {
  csvRead('criancas', function(data) {
    const output = { labels: [], values: [] }

    var disparos = data
    .map(function(el){ // transforma disparos em Int (é string)
      el.atingidos = parseInt(el.atingidos)
      return el
    })
    .sort(function(a, b) { // ordena por qtd de disparos
      return b.atingidos - a.atingidos
    })
    .slice(0, 10) // pega os 5 primeiros
    .forEach(function(el){ // adiciona bairros e disparos no objeto output
      output.labels.push(el.bairro)
      output.values.push(el.atingidos)
    }, this)

    res.send(output) // envia o objeto final
  })
});

/* Função de ranking em UPP na região metropolitana */
router.get('/adolescentes', function(req, res, next) {
  csvRead('adolescentes', function(data) {
    const output = { labels: [], values: [] }

    var disparos = data
    .map(function(el){ // transforma disparos em Int (é string)
      el.atingidos = parseInt(el.atingidos)
      return el
    })
    .sort(function(a, b) { // ordena por qtd de disparos
      return b.atingidos - a.atingidos
    })
    .slice(0, 10) // pega os 5 primeiros
    .forEach(function(el){ // adiciona bairros e disparos no objeto output
      output.labels.push(el.bairro)
      output.values.push(el.atingidos)
    }, this)

    res.send(output) // envia o objeto final
  })
});

module.exports = router;
