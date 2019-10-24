/**
 * File              : source.cpp
 * Author            : INMAK <jchrys@me.com>
 * Date              : 24.10.2019
 * Last Modified Date: 24.10.2019
 * Last Modified By  : INMAK <jchrys@me.com>
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    cin >> q;
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << a + b + (rand()%2) << endl;
    }
    return 0;
}
