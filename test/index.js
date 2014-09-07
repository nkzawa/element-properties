describe('element-properties', function() {

  beforeEach(function() {
    this.definitions = {
      Foo: 1,
      publish: {
        Bar: 2,
        Baz: {value: 3, reflect: true}
      }
    };
  });

  it('should define properties and attributes', function() {
    var node = document.createElement('div');
    elementProperties(node, this.definitions);

    expect(node.Foo).to.eql(1);
    expect(node.Bar).to.eql(2);
    expect(node.Baz).to.eql(3);
    expect(node.getAttribute('Foo')).not.to.be.ok();
    expect(node.getAttribute('Bar')).not.to.be.ok();
    expect(node.getAttribute('Baz')).to.be('3');
  });

  it('should define properties from default attributes', function() {
    var node = document.createElement('div');
    node.setAttribute('Foo', 4);
    node.setAttribute('Bar', 5);
    node.setAttribute('Baz', 6);

    elementProperties(node, this.definitions);

    expect(node.Foo).to.eql(1);
    expect(node.Bar).to.eql(5);
    expect(node.Baz).to.eql(6);
    // doesn't work on IE8
    //expect(node.getAttribute('Foo')).to.be('4');
    expect(node.getAttribute('Bar')).to.be('5');
    expect(node.getAttribute('Baz')).to.be('6');
  });

  it('should publish properties as attributes', function() {
    var node = document.createElement('div');
    elementProperties(node, this.definitions);

    // doesn't work on IE8
    //node.setAttribute('Foo', 4);
    node.setAttribute('Bar', 5);
    node.setAttribute('Baz', 6);

    expect(node.Bar).to.eql(5);
    expect(node.Baz).to.eql(6);
    expect(node.getAttribute('Bar')).to.be('5');
    expect(node.getAttribute('Baz')).to.be('6');
  });

  it('should reflect properties to attributes', function() {
    var node = document.createElement('div');
    elementProperties(node, this.definitions);

    node.Foo = 4;
    node.Bar = 5;
    node.Baz = 6;

    expect(node.Foo).to.eql(4);
    expect(node.Bar).to.eql(5);
    expect(node.Baz).to.eql(6);
    expect(node.getAttribute('Foo')).not.to.be.ok();
    expect(node.getAttribute('Bar')).not.to.be.ok();
    expect(node.getAttribute('Baz')).to.be('6');
  });

  it('should call handler', function() {
    var node = document.createElement('div');
    var args = [];
    elementProperties(node, this.definitions, function() {
      args.push(Array.prototype.slice.call(arguments));
    });

    expect(args).to.eql([
      ['Foo', undefined, 1],
      ['Bar', undefined, 2],
      ['Baz', undefined, 3]
    ]);
  });

  it('should call handler by changing property values', function() {
    var node = document.createElement('div');
    var args = [];
    elementProperties(node, this.definitions, function() {
      args.push(Array.prototype.slice.call(arguments));
    });

    args = [];
    node.Foo = 4;
    node.Bar = 5;
    node.Baz = 6;

    expect(args).to.eql([
      ['Foo', 1, 4],
      ['Bar', 2, 5],
      ['Baz', 3, 6]
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
    //node.setAttribute('Foo', 4);
    node.setAttribute('Bar', 5);
    node.setAttribute('Baz', 6);

    expect(args).to.eql([
      ['Bar', 2, 5],
      ['Baz', 3, 6]
    ]);
  });
});

