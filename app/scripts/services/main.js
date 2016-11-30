angular.module('exampleApp')
.factory('MainService', MainService);

 function MainService() {
    let list = [
        {
            name: "deal1",
            decs: "bla bla bla",
            traffic: "M2M",
            status: "idle",
            owner: "G800903",
            share: "10",
            reviewed: false
        }
    ];
    return {
        getDealList() {
            return list;
        },

        getDealByname(name) {         
            return list.find(d => d.name ===name);         
        },

        checkExistDeal(name) {
            return list.find(d => d.name ===name);   
        },

        deleteDealByname(name) {
           return list.map((l, index) => {
                            if (l.name.toLowerCase()===name.toLowerCase()) {
                                list.splice(index, 1);
                                return list;
                            } 
                        });
        },

        addDeal(deal) {
            if (!this.checkExistDeal(deal.name)) {
                list.push(deal);
            }            
        },

        updateDeal(deal) {
            list.map(li => {
                if (li.name === deal.name){
                    Object.keys(li).map(item => {
                        li[item] = deal[item];
                    })                    
                }
            })           
        }        

        
    };
    
        
}   