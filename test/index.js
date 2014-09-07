describe('element-properties', function() {

  beforeEach(function() {
    this.definitions = {
      foo: 1,
      publish: {
        bar: 2,
        baz: {value: 3, reflect: true}
      }
    };
  });

  it('should define properties and attributes', function() {
    var node = document.createElement('div');
    elementProperties(node, this.definitions);

    expect(node.foo).to.eql(1);
    expect(node.bar).to.eql(2);
    expect(node.baz).to.eql(3);
    expect(node.getAttribute('foo')).not.to.be.ok();
    expect(node.getAttribute('bar')).not.to.be.ok();
    expect(node.getAttribute('baz')).to.be('3');
  });

  it('should define properties from default attributes', function() {
    var node = document.createElement('div');
    node.setAttribute('foo', 4);
    node.setAttribute('bar', 5);
    node.setAttribute('baz', 6);

    elementProperties(node, this.definitions);

    expect(node.foo).to.eql(1);
    expect(node.bar).to.eql(5);
    expect(node.baz).to.eql(6);
    // doesn't work on IE8
    //expect(node.getAttribute('foo')).to.be('4');
    expect(node.getAttribute('bar')).to.be('5');
    expect(node.getAttribute('baz')).to.be('6');
  });

  it('should publish properties as attributes', function() {
    var node = document.createElement('div');
    elementProperties(node, this.definitions);

    // doesn't work on IE8
    //node.setAttribute('foo', 4);
    node.setAttribute('bar', 5);
    node.setAttribute('baz', 6);

    expect(node.bar).to.eql(5);
    expect(node.baz).to.eql(6);
    expect(node.getAttribute('bar')).to.be('5');
    expect(node.getAttribute('baz')).to.be('6');
  });

  it('should reflect properties to attributes', function() {
    var node = document.createElement('div');
    elementProperties(node, this.definitions);

    node.foo = 4;
    node.bar = 5;
    node.baz = 6;

    expect(node.foo).to.eql(4);
    expect(node.bar).to.eql(5);
    expect(node.baz).to.eql(6);
    expect(node.getAttribute('foo')).not.to.be.ok();
    expect(node.getAttribute('bar')).not.to.be.ok();
    expect(node.getAttribute('baz')).to.be('6');
  });

  it('should call handler', function() {
    var node = document.createElement('div');
    var args = [];
    elementProperties(node, this.definitions, function() {
      args.push(Array.prototype.slice.call(arguments));
    });

    expect(args).to.eql([
      ['foo', undefined, 1],
      ['bar', undefined, 2],
      ['baz', undefined, 3]
    ]);

    args = [];
    node.foo = 4;
    node.bar = 5;
    node.baz = 6;

    expect(args).to.eql([
      ['foo', 1, 4],
      ['bar', 2, 5],
      ['baz', 3, 6]
    ]);
  });

  it('should call handler by changing attributes', function() {
    var node = document.createElement('div');
    var args = [];
    elementProperties(node, this.definitions, function() {
      args.push(Array.prototype.slice.call(arguments));
    });

    args = [];
    // doesn't work on IE8
    //node.setAttribute('foo', 4);
    node.setAttribute('bar', 5);
    node.setAttribute('baz', 6);

    expect(args).to.eql([
      ['bar', 2, 5],
      ['baz', 3, 6]
    ]);
  });
});

