import React, {useState, useEffect} from 'react';

export default function HistoryList(){
    useEffect(() => {
      const subscriber = firestore()
        .collection('History')
        .onSnapshot(querySnapshot => {
          const users = [];

          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setUsers(users);
          setLoading(false);
        });

      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);

}