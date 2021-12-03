#include<iostream>
#include<set>
#include<vector>
#include<algorithm>
#include<math.h>
using namespace std;
double dot[2];  // точка пересечения

enum Type {
    Start,
    Cross,
    End
};

struct pt {
	double x, y;
};

struct seg {
	pt p, q;
    int id;
    
    double GetY (double x) const {
		if (p.x == q.x)  return p.y;
		return p.y + (q.y - p.y) * (x - p.x) / (q.x - p.x);
	}

    bool operator< (const seg & s) const {
        return GetY(p.x) < s.p.y;
    }
};

bool cross(const seg & a, const seg & b) {
    double n;
    if (a.q.y - a.p.y != 0) {  // a(y)
        double q = (a.q.x - a.p.x) / (a.p.y - a.q.y);
        double sn = (b.p.x - b.q.x) + (b.p.y - b.q.y) * q; if (!sn) return false;  // c(x) + c(y)*q
        double fn = (b.p.x - a.p.x) + (b.p.y - a.p.y) * q;   // b(x) + b(y)*q
        n = fn / sn;
    }
    else {
        if (!(b.p.y - b.q.y)) return false;  // b(y)
        n = (b.p.y - a.p.y) / (b.p.y - b.q.y);   // c(y)/b(y)
    }
    dot[0] = b.p.x + (b.q.x - b.p.x) * n; // b.p.x + (-b(x))*n
    dot[1] = b.p.y + (b.q.y - b.p.y) * n;  // b.p.y +(-b(y))*n
    return (dot[0] >= min(a.p.x,a.q.x) && dot[0] <= max(a.p.x,a.q.x) && dot[0] >= min(b.p.x,b.q.x) && dot[0] <= max(b.p.x,b.q.x))? true:false;
}

struct event {
	double x;
	Type type;
    int id, id2;

    bool operator< (const event & e) const {
        if (x != e.x)  return x < e.x;
		if (type != e.type) return type < e.type;
        return id < e.id;
    }
};


set<event> listA; //множество контрольных точек
vector<pt> res;
set<seg> listB; //множество id отрезков в момент времени
inline set<seg>::iterator prev (set<seg>::iterator it) {
	return it == listB.begin() ? listB.end() : --it;
}
inline set<seg>::iterator next (set<seg>::iterator it) {
	return ++it;
}

void CrossRes(int id, int id2) {
    res.push_back({dot[0],dot[1]});
    listA.insert({dot[0],Cross,id, id2});
}

int main() {  
    int n;
    double x1, y1, x2, y2;
    //cout << "Введите количество отрезков: ";
    cin >> n;

    vector<seg> a(n); //вектор с координатами
    vector < set<seg>::iterator > where(n); //итераторы на координаты в listB
    

    for (int i = 0; i < n; i++) {
        //cout<<i+1<<": ";
        cin >> x1 >> y1 >> x2 >> y2;
        if ((x1 < x2)||(x1 == x2)&&(y1 < y2))
            a[i] = {x1, y1, x2, y2, i};
        else if ((x1 > x2)||(x1 == x2)&&(y2 < y1))
            a[i] = {x2, y2, x1, y1, i};
        else{
            cout<<"Один из отрезков является точкой";
            return 0;
        } 
    }
    for (int i = 0; i < n; i++) {
        event left = { a[i].p.x, Start, i };
        event right = { a[i].q.x, End, i };
        listA.insert (right);
        listA.insert (left);
    }

    listB.clear();
    for (event tec : listA) { //обработка событий

        if (tec.type == Start){ // обработка начала отрезка
            set<seg>::iterator
				nxt = listB.lower_bound(a[tec.id]),
				prv = prev (nxt);
                if (nxt != listB.end()&&cross(*nxt, a[tec.id]))
                    CrossRes(tec.id, (*nxt).id);
                if (prv != listB.end()&&cross(*prv, a[tec.id]))
                    CrossRes(tec.id, (*prv).id);
                where[tec.id] = listB.insert (nxt, a[tec.id]);
        } else if (tec.type == End) { // обработка конца отрезка
            set<seg>::iterator
				nxt = next (where[tec.id]),
				prv = prev (where[tec.id]);
			if (nxt != listB.end() && prv != listB.end() && cross(*nxt, *prv))
				CrossRes((*prv).id, (*nxt).id);
			listB.erase (where[tec.id]);
        } else { // обработка пересечения
            cout<<"пересечение "<<tec.id<<" "<<tec.id2<<endl;
            set<seg>::iterator
                up = where[0],
                down = where[1];
            //iter_swap(&where[tec.id],&where[tec.id2]);
            //swap(where[tec.id],where[tec.id2]);
            //listB.erase (where[tec.id]);
            //listB.erase (where[tec.id2]);
            
            //if(up == where[1])
            //cout<<"aaaaaaaaaaaaa";
            for (seg i : listB) {
                cout<<i.id<<" ";
            } break;
        }
        for (seg i : listB) {
            cout<<i.id<<" ";
        }
        cout<<endl;
    }

    /*cout<<"size "<<listB.size()<<endl;
    for (seg i : listB) {
        cout<<i.id<<endl;
    }
    for (pt i : res) {
        //cout<<x<<<<endl;
        cout<<i.x<<" "<<i.y<<endl;
    }*/
    
    return 0;
}