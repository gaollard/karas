let json = {
  tagName: 'canvas',
  props: {
    width: 360,
    height: 360,
  },
  children: [{
    tagName: 'div',
    props: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        padding: 2,
        background: '#CCC',
      },
    },
    children: [
      {
        tagName: 'span',
        props: {
          style: {
            position: 'relative',
            padding: 2,
            background: '#F00',
          }
        },
        children: ['a']
      },
      {
        tagName: 'span',
        props: {
          style: {
            padding: 2,
            background: '#0F0',
          }
        },
        children: ['b']
      },
      {
        tagName: 'span',
        props: {
          style: {
            padding: 2,
            background: '#00F',
          }
        },
        children: ['c']
      },
      'd',
      {
        tagName: 'span',
        props: {
          style: {
            position: 'relative',
            padding: 2,
            background: '#FF0',
          }
        },
        children: ['e']
      },
      {
        tagName: 'span',
        props: {
          style: {
            padding: 2,
            background: '#0FF',
          }
        },
        children: ['f']
      },
      'g',
    ],
  }]
};

karas.parse(json, '#test');

let d1 = document.querySelector('canvas').toDataURL();

json.props.cache = true;
karas.parse(json, '#test');

let d2 = document.querySelector('canvas').toDataURL();

let input = document.querySelector('input');
input.value = (d1 + ' ' + d2);
