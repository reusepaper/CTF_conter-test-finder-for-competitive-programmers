/**
 * @file             : node_example.js
 * @author           : INMAK <jchrys@me.com>
 * Date              : 04.11.2019
 * Last Modified Date: 04.11.2019
 * Last Modified By  : INMAK <jchrys@me.com>
 */

var exec = require('child_process').exec;
var child;

command = "python main.py "
source = `'
#include <bits/stdc++.h>
using namespace std;

int main() {
  int q, a, b;
  cin >> q;
  while(q--) {
    cin >> a >> b;
    cout << a + b << endl;
  }
  return 0;
}
'
` 
child = exec(command + source,
  function (error, stdout, stderr) {
    var result = stdout
    result = JSON.parse(result);
    console.log(result)
})
