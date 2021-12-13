#include<iostream>
#include<set>
#include<vector>
#include<algorithm>
#include<math.h>
#include<ctime>
using namespace std;
double dot[2];  // точка пересечения
int precision = 5;
double tecx;

enum Type { 
    Start, 
    End,   
};

struct pt {
	double x, y;
};

struct seg {
	pt p, q;
    int id;
    
    double GetY (seg s, double x) const {
		if (s.p.x == s.q.x)  return s.p.y;
		return s.p.y + (s.q.y - s.p.y) * (x - s.p.x) / (s.q.x - s.p.x);
	}

    bool operator< (const seg & s) const {
        //return GetY(*this, tecx) <= GetY(s, tecx); //normal mode
        return GetY(*this, tecx+0.0001) <= GetY(s, tecx+0.0001); //cheat code
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
    dot[0] = round((b.p.x + (b.q.x - b.p.x) * n)*pow(10,precision))/(pow(10,precision)); // b.p.x + (-b(x))*n
    dot[1] = round((b.p.y + (b.q.y - b.p.y) * n)*pow(10,precision))/(pow(10,precision)); // b.p.y +(-b(y))*n
    if (dot[0]==-0)
        dot[0]=0;
    if (dot[1]==-0)
        dot[1]=0;
    return (dot[0] >= min(a.p.x,a.q.x) && dot[0] <= max(a.p.x,a.q.x) && dot[0] >= min(b.p.x,b.q.x) && dot[0] <= max(b.p.x,b.q.x)&&
    dot[1] >= min(a.p.y,a.q.y) && dot[1] <= max(a.p.y,a.q.y) && dot[1] >= min(b.p.y,b.q.y) && dot[1] <= max(b.p.y,b.q.y))? true:false;
}

struct event {
	double x;
	Type type;
    int id;

    bool operator< (const event & e) const {
        if (x != e.x)  return x < e.x;
		if (type != e.type) return type <= e.type;

        return id < e.id;
    }
};

vector<seg> a;
set<event> listA; //множество контрольных точек
bool logg = false; 
set<seg> listB; //множество id отрезков в момент времени
inline set<seg>::iterator prev (set<seg>::iterator it) {
	return it == listB.begin() ? listB.end() : --it;
}
inline set<seg>::iterator next (set<seg>::iterator it) {
	return ++it;
}

void CrossRes(int id, int id2) {
    cout<<"Пересечение в точке "<<"x= "<<dot[0]<<" y= "<<dot[1]<<"\n";
    cout<<"Время работы: "<<clock()<<"\n";
    exit(0);
}

int main() {
    int n;
    double x1, y1, x2, y2;
    //cout << "Введите количество отрезков: ";
    cin >> n;
    if (n < 0) logg = true;
    n = abs(n);
    vector<seg> a(n); //вектор с координатами
    vector < set<seg>::iterator > where(n); //итераторы на координаты в listB
    a.resize(n);

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
        tecx = tec.x;
        
        if (tec.type == Start){ // обработка начала отрезка
            if (logg)
                cout<<">>add id: "<<tec.id<<"\n";
            set<seg>::iterator
				nxt = listB.lower_bound(a[tec.id]),
				prv = prev (nxt);
                if (nxt != listB.end()&&cross(*nxt, a[tec.id]))
                    CrossRes(tec.id, (*nxt).id);
                if (prv != listB.end()&&cross(*prv, a[tec.id]))
                    CrossRes(tec.id, (*prv).id);
                where[tec.id] = listB.insert (nxt, a[tec.id]);
        } else { // обработка конца отрезка
            if (logg)
                cout<<">>del id: "<<tec.id<<"\n";
            set<seg>::iterator
				nxt = next (where[tec.id]),
				prv = prev (where[tec.id]);
			if (nxt != listB.end() && prv != listB.end() && cross(*nxt, *prv))
				CrossRes((*prv).id, (*nxt).id);
			listB.erase (where[tec.id]);
        }

        if(logg) {
	        for (seg i : listB)
	            cout<<i.id<<" ";
	        cout<<"\n";
        } 
    }

    cout<<"Пересечение не обнаружено!"<<"\n";
    cout<<"Время работы: "<<clock()<<"\n";

    return 0;
}