// Write your tests here!
// Here is an example.
Tinytest.add('root node', function (test) {
  rootNode = DataTree.root();
  test.instanceOf(rootNode, DataTree.Node);


  rootChild = rootNode.createChild();
  test.instanceOf(rootChild, DataTree.Node);

  thread = rootChild.createThread('some');
  _.extend(thread.data(), {
    name: 'some-data',
    value: 'some-value',
    and: 42,
    and1: 'so on'
  });

  test.equal(thread.type(), 'some');
  test.equal(thread.data().name, 'some-data');
  test.equal(thread.data().and, 42);

  rootChild.save();


  var testChild = DataTree.root().children()[0];
  var testThread = testChild.threads()[0];


  test.equal(testThread.type(), 'some');
  var data = testThread.data();
  test.equal(data.and1, 'so on');

  DataTree.remove(root);
});

Tinytest.add('tags', function (test) {
  var tag = DataTree.createTag('someTag');

  test.instanceOf(tag, DataTree.Tag);
  test.equal(tag.name(), 'someTag');

  var root = DataTree.root();
  root.addTag(tag);

  console.log('%o', root);

  test.isTrue(_(root.tags()).contains(tag));

  var tag2 = DataTree.createTag('tag2');
  root.addTag(tag2);

  test.isTrue(_(root.tags()).contains(tag));
  test.isTrue(_(root.tags()).contains(tag2));
});

