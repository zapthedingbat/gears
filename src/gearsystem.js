export class GearSystem {
    constructor () {
        this._edges = new Map();
    }

    set(a, b){
        this._addEdge(a, b);
        this._addEdge(b, a);
    }
    
    _addEdge(a, b) {
        let nodes = this._edges.get(a);
        if(!nodes){
            this._edges.set(a, new Set([b]));
        }else{
            nodes.add(b);
        }
    }

    delete(a, b){
        this._removeEdge(a, b);
        this._removeEdge(b, a);
    }

    _removeEdge(a, b){
        let nodes = this._edges.get(a);
        if(nodes){
            nodes.delete(b);
        }
    }

    get(key){
        return this._edges.get(key);
    }

    follow(node, func){
        const q = [node];
        const s = new Set(q);
        if(func(node)){
            return;
        }
        while(q.length > 0){
            let current = q.pop();
            let edges = this.get(current);
            for(const edge of edges){
                if(!s.has(edge)){
                    if(func(edge, current)){
                        return;
                    }
                    s.add(edge);
                    q.push(edge);
                }
                
            }
        }
    }

    [Symbol.iterator](...args){
        return this._edges.keys(...args);
    }
}
