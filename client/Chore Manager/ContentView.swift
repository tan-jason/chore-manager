//
//  ContentView.swift
//  Chore Manager
//
//  Created by Jason Tan on 2023-01-22.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            List{
                NavigationLink {
                    CreateHouse()
                } label: {
                    Text("Create a House")
                }.buttonStyle(PlainButtonStyle())
                
                NavigationLink {
                    Text("Join a House")
                } label: {
                    Text("Join a House")
                }
//
//                NavigationLink {
//                    Text("Houses")
//                } label: {
//                    Text("Your Houses")
//                }
            }
            .navigationTitle("CHORE MANAGER")
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
