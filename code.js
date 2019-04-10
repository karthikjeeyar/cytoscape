// import cola from 'cytoscape-cola';

// cytoscape.use( cola );
function makeSvg(ele) {
    return {svg: 'nodejs.svg'}
}
cytoscape({
    container: document.getElementById('cy'),
    userZoomingEnabled: true,
    layout: {
            name: 'grid',
            cols: 2
    },
  
    style: cytoscape.stylesheet()
      .selector('node')
        .css({
          'shape': 'data(faveShape)',
          'height': 80,
          'width': 80,
          'content': 'data(name)',
          "text-valign": "bottom",
          "text-halign": "center",
          "text-wrap": 'wrap',
          "text-max-width": 40,
          'text-outline-width': 2,
          'text-outline-color': 'data(faveColor)',
          'background-color': 'data(faveColor)',
          'color': '#fff'
        })
      .selector(':selected')
        .css({
          'border-width': 3,
          'border-color': '#333'
        })
      .selector('edge')
        .css({
          'curve-style': 'bezier',
          'opacity': 0.666,
          'width': 'mapData(strength, 70, 100, 2, 6)',
          'target-arrow-shape': 'triangle',
        //   'source-arrow-shape': 'circle',
          'line-color': 'data(faveColor)',
          'source-arrow-color': 'data(faveColor)',
          'target-arrow-color': 'data(faveColor)'
        })
      .selector('edge.dashed')
        .css({
          'line-style': 'dashed',
          'target-arrow-shape': 'triangle'
        }),
      
    elements: {
      nodes: [
        { data: { id: 'j', name: 'nodeJs', weight: 65, faveColor: '#6FB1FC', faveShape: 'cicle', pods: [],  } },
        { data: { id: 'e', name: 'mySql', weight: 45, faveColor: 'blue', faveShape: 'ellipse' } },
        { data: { id: 'k', name: 'Mongodb', weight: 75, faveColor: '#86B342', faveShape: 'circle' } },
        { data: { id: 'g', name: 'redis', weight: 70, faveColor: '#F5A45D', faveShape: 'circle' } },
        { data: { id: 'h', name: 'rover', weight: 100, faveColor: '#F5A45D', faveShape: 'circle' } }
      ],
      edges: [
        { data: { source: 'j', target: 'e', faveColor: '#6FB1FC', strength: 90 } },
        { data: { source: 'j', target: 'k', faveColor: '#6FB1FC', strength: 70 } },
        { data: { source: 'j', target: 'g', faveColor: '#6FB1FC', strength: 80 } },
        { data: { source: 'g', target: 'j', faveColor: '#F5A45D', strength: 90 }, classes: 'dashed' },
      ]
    },
  
    ready: function(){
      window.cy = this;
      document.getElementById('toggleZoom').addEventListener('click', toggleZoom);
      
      cy.on('select', 'node', function(e){
        window.cy.animate({
            center: {
                eles: e.target,
            },
            zoom: 2,
          }, {
          duration: 500
          });
      });
      
      cy.on('unselect', 'node', function(e){
      window.cy.animate({
          zoom: 1,
          center: cy.$('nodes'),
        }, {
        duration: 500
        });
      });
   
      function toggleZoom(e) {
        window.cy.zoomingEnabled(!cy.zoomingEnabled());
      }  
      
    }
  });