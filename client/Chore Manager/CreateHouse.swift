//
//  CreateHouse.swift
//  Chore Manager
//
//  Created by Jason Tan on 2023-01-22.
//

import SwiftUI

struct CreateHouse: View {
    @State private var houseName: String = ""
    @State private var creatingHouse: Bool = false
    
    var body: some View {
        Form {
            Section ("Input a name for your home") {
                TextField("House name", text: $houseName.animation())
                    .multilineTextAlignment(.center)
                    .font(.callout)
                
            }
            
            Section {
                if (houseName.count > 0 && validateHouseName(houseName: houseName)) {
                    Button("Create House") {
                        creatingHouse.toggle()
                    }
                }
            }
        }
        .navigationTitle("Create a House")
        .alert("Creating House", isPresented: $creatingHouse) {
            
        } message: {
            ProgressView()
        }
    }
    
    
    func validateHouseName(houseName: String) -> Bool {
        if (houseName.count > 128) {
            return false
        } else {
            return true
        }
    }
}

struct HouseViewWrapper: View {
    @State var houseCreateSuccess: Bool = false
    
    var body: some View {
        return Group {
            if(houseCreateSuccess) {
                HouseView()
            } else {
                CreateHouse()
            }
        }
    }
}

struct CreateHouse_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            CreateHouse()
        }
    }
}
